// require('dotenv').config()    // Development ONLY

const MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  React = require('react'),
  renderToString = require('react-dom/server').renderToString,
  configureStore = require('../app/configureStore').default,
  Provider = require('react-redux').Provider,
  App = require('../app/containers/App').default,
  url = process.env.MONGO_ATLAS_URI,
  auth0Id = process.env.AUTH0_ID,
  auth0Domain = process.env.AUTH0_DOMAIN;


module.exports = (app) => {
  function setHeaders() {
        const headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers['Access-Control-Allow-Origin'] = req.headers.origin;
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
        headers['Access-Control-Allow-Credentials'] = false;
        headers['Access-Control-Max-Age'] = '86400'; // 24 hours
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';

        return headers;
  }

  function handleRender(req, res) {
    //console.log(req)
    // Get recipes from MONGO_ATLAS_URI
    MongoClient.connect(url, (err, client) => {
      assert.strictEqual(null, err);

      const db = client.db();
      const collection = db.collection('public');

      collection.find({}).toArray((err, docs) => {
        const recipes = docs;

        let preloadedState = {
          animation: {
            addToUserRecipes: ''
          },
          auth: {
            isAuthenticated: false,
            isFetching: false,
            id_token: null,
            name: null,
            email: null,
            errorMessage: ''
          },
          modal: {
            content: '',
            dialogue: '',
            show: false
          },
          recipes: {
            public: recipes,
            private: []
          },
          sort: {
            asc: false,
            desc: false,
            stars: false
          },
          visibilityFilter: {
            active: 'public',
            content: ['']
          }
        };

        const store = configureStore(preloadedState);

        const html = renderToString(
          <Provider store={store}>
            <App />
          </Provider>
        );

        const finalState = store.getState();

        res.send(renderFullPage(html, finalState));

        client.close();
      });
    });
  }

  function renderFullPage(html, preloadedState) {
    return `
    <!DOCTYPE html>
    <html lang='EN'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no' />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <title>the Jam</title>

        <link rel='manifest' href='manifest.json' />
        <link rel='icon' sizes='192x192' href='images/hi_jam.gif' />
        <link rel='shortcut icon' href='favicon.ico' type='image/x-icon'/>
        <link href='https://fonts.googleapis.com/css?family=Lato|Molle:400i|Architects+Daughter' rel='stylesheet' />
        <link rel='stylesheet' href='bundle.css' />
      </head>
      <body>
        <div id='root'>${html}</div>
        <script src="https://cdn.auth0.com/w2/auth0-7.2.min.js"></script>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};

          var auth0 = new Auth0({
            domain: '${auth0Domain}',
            clientID: '${auth0Id}'
          }),
            result = auth0.parseHash(window.location.hash);

          if (result && result.idTokenPayload) {
            var idTokenPayload = result.idTokenPayload,
              name = idTokenPayload.name ? idTokenPayload.name.replace(/\\.$/, '') : null,
              username = idTokenPayload.username ? idTokenPayload.username.replace(/\\.$/, '') : null,
              profile = {
                name: name,
                email: idTokenPayload.email,
                username: username
              };
            window.localStorage.setItem('idToken', result.idToken);
            window.localStorage.setItem('profile', JSON.stringify(profile));
          }

          var isAuthenticated = !!window.localStorage.getItem('idToken'),
              profile = window.localStorage.getItem('profile') ? JSON.parse(window.localStorage.getItem('profile')) : {},
              preloadedState = window.__PRELOADED_STATE__;

          if (isAuthenticated) preloadedState.visibilityFilter.active = 'private';
          preloadedState.auth.isAuthenticated = isAuthenticated;
          preloadedState.auth.name = profile.username || profile.name;
          preloadedState.auth.email = profile.email || null;
          preloadedState.auth.id_token = window.localStorage.getItem('idToken');
          window.__PRELOADED_STATE__ = JSON.stringify(preloadedState);
        </script>
        <script type='text/javascript' src='bundle.js'></script>
      </body>
    </html>
    `;
  }
  app.get('*', (req, res) => handleRender(req, res));
  //   console.log('Request: ', req.body);
  //   res.sendFile(index.html);
  // });

  app.all('/new', (req, res) => {
    if (req.method == 'OPTIONS') {
      const headers = setHeaders();
      res.writeHead(200, headers);
      res.end();
    } else if (req.method == 'POST') {
      MongoClient.connect(url, (err, client) => {
        assert.strictEqual(null, err);

        const recipe = req.body.recipe,
              user = req.body.user || 'public'

        const db = client.db();
        const collection = db.collection(user);

        collection.insertOne(recipe, (err, result) => {
          assert.strictEqual(null, err);
          res.json(result.ops[0]);
          client.close();
          res.end();
        });
      });
    }
  });

  app.all('/edit', (req, res) => {
    if (req.method == 'OPTIONS') {
      const headers = setHeaders();
      res.writeHead(200, headers);
      res.end();
    } else if (req.method == 'POST') {
      MongoClient.connect(url, (err, client) => {
        assert.strictEqual(null, err);

        const db = client.db();
        const recipe = req.body.recipe,
              user = req.body.user || 'public',
              collection = db.collection(user);

        collection.updateOne({id: recipe.id}, recipe, (err, result) => {
          assert.strictEqual(null, err);
          res.json(result);
          client.close();
          res.end();
        });
      });
    }
  });

  app.all('/delete', (req, res) => {
    if (req.method == 'OPTIONS') {
      const headers = setHeaders();
      res.writeHead(200, headers);
      res.end();
    } else if (req.method == 'POST') {
      MongoClient.connect(url, (err, client) => {
        assert.strictEqual(null, err);

        const db = client.db();
        const recipe = req.body.recipe,
              user = req.body.user || 'public',
              collection = db.collection(user);

        collection.deleteOne({id: recipe.id}, (err, result) => {
          assert.strictEqual(null, err);
          res.json(result);
          client.close();
          res.end();
        });
      });
    }
  });

  app.all('/recipes', (req, res) => {
    if (req.method == 'OPTIONS') {
      const headers = setHeaders();
      res.writeHead(200, headers);
      res.end();
    } else if (req.method == 'POST') {
      MongoClient.connect(url, (err, client) => {
        assert.strictEqual(null, err);

        const db = client.db();
        const collection = db.collection(req.body.user);

        collection.find({}).toArray((err, docs) => {
          assert.strictEqual(null, err);
          res.json(docs);
          client.close();
          res.end();
        })
      });
    }
  });

  app.all('/find', (req, res) => {
    if (req.method == 'OPTIONS') {
      const headers = setHeaders();
      res.writeHead(200, headers);
      res.end();
    } else if (req.method == 'POST') {
      MongoClient.connect(url, (err, client) => {
        assert.strictEqual(null, err);

        const db = client.db();
        const collection = db.collection(req.body.user),
              recipe = req.body.recipe;

        collection.find({id: recipe.id}).toArray((err, docs) => {
          assert.strictEqual(null, err);
          res.json(docs[0]);
          client.close();
          res.end();
        })
      })
    }
  });
};
