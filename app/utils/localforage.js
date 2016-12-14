import localforage from 'localforage'

const options = {
  name        : 'theJam',
  version     : 1.0,
  storeName   : 'authStore', // Should be alphanumeric, with underscores.
  description : 'storage for JWT'
}

export default localforage.config(options)
