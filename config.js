const Confidence = require('confidence');
const criteria = { env: process.env.NODE_ENV };

const config = {
  $meta: 'This file configures the API.',
  server: {
    port: {
      $filter: 'env',
      production: process.env.PORT || 3000,
      $default: process.env.PORT || 3000
    },
    shouldRequireLout: {
      $filter: 'env',
      production: false,
      $default: true
    },
    load: {
      sampleInterval: {
        $filter: 'env',
        production: false,
        $default: 1000
      }
    }
  },

  postgresql: {
    $filter: 'env',
    production: {
      url: process.env.DATABASE_URL
    },
    test: {
      url: 'postgres://user:password@localhost:5432/test-db-id'
    },
    $default: {
      url: 'postgres://user:password@localhost:5432/dev-db-id'
    }
  },

  // https://github.com/ddollar/redis-url
  // redis://[:password@]host:port[/db-number][?option=value]
  redis: {
    $filter: 'env',
    production: {
      url: process.env.REDIS_URL
    },
    test: {
      url: 'redis://h:password@localhost:6379/2'
    },
    $default: {
      url: 'redis://h:password@localhost:6379/2'
    }
  }
};

// ---

const store = new Confidence.Store(config);

exports.get = function (key) {

  return store.get(key, criteria);
};

exports.meta = function (key) {

  return store.meta(key, criteria);
};
