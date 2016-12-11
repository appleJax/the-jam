const MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      url = process.env.MONGODB_URI;

function setHeaders() {
      const headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

      return headers;
}

module.exports = (app) => {
  app.get('*', (req, res) => res.sendFile('.public/index.html'));

  app.all('/new', (req, res) => {
    if (req.method == 'OPTIONS') {
      const headers = setHeaders();
      res.writeHead(200, headers);
      res.end();
    } else if (req.method == 'POST') {
      MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);

        const collection = db.collection('recipes'),
              recipe = req.body;
        collection.insert(recipe, (err, result) => {
          assert.equal(null, err);
          res.json(result.ops[0]);
          db.close();
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
      MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);

        const collection = db.collection('recipes'),
              recipe = req.body;
        collection.update({id: recipe.id}, recipe, (err, result) => {
          assert.equal(null, err);
          res.json(result);
          db.close();
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
      MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);

        const collection = db.collection('recipes'),
              recipe = req.body;
        collection.remove(recipe, (err, result) => {
          assert.equal(null, err);
          res.json(result);
          db.close();
          res.end();
        });
      });
    }
  });
};
