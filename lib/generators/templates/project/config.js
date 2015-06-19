const Confidence = require('confidence');
const Hoek = require('hoek');
const criteria = { env: process.env.NODE_ENV };
const pkg = require('./package.json');
const plugins = require('./plugins');

const config = {
  '$meta': 'This file configures the project.',

  'name': pkg.name,
  'environment': {
    '$meta': 'NODE_ENV',
    '$filter': 'env',
    'production': 'production',
    'test': 'test',
    '$default': 'development'
  },

  'server': {
    'port': {
      '$filter': 'env',
      'production': process.env.PORT,
      '$default': 3000
    },
    'load': {
      'sampleInterval': {
        '$filter': 'env',
        'production': 0,
        'test': 0,
        '$default': 1000
      }
    },
    'enforceEncryption': {
      '$meta': '301 when x-forwarded-proto does not equal https',
      '$filter': 'env',
      'production': true,
      '$default': false
    },
    'plugins': {
      '$meta': 'conditionally returns `plugins.production` when NODE_ENV is production; `plugins.always` otherwise',
      '$filter': 'env',
      'production': Hoek.applyToDefaults(plugins.always, plugins.production),
      '$default': plugins.always
    }
  },

  'postgresql': {
    '$filter': 'env',

    'production': {
      'client': 'postgresql',
      'connection': process.env.DATABASE_URL,
      'pool': {
        'min': 2,
        'max': 10
      },
      'migrations': {
        'tableName': 'knex_migrations'
      }
    },
    'test': {
      'client': 'postgresql',
      'connection': 'postgres://user:password@localhost:5432/test-db-id?ssl=true',
      'pool': {
        'min': 2,
        'max': 10
      },
      'migrations': {
        'tableName': 'knex_migrations'
      }
    },
    '$default': {
      'client': 'postgresql',
      'connection': 'postgres://user:password@localhost:5432/dev-db-id?ssl=true',
      'pool': {
        'min': 2,
        'max': 10
      },
      'migrations': {
        'tableName': 'knex_migrations'
      },
      'debug': true
    }
  },

  'redis': {
    '$meta': 'Please see: https://github.com/ddollar/redis-url -- Example: redis://[:password@]host:port[/db-number][?option=value]',
    '$filter': 'env',
    'production': {
      'url': process.env.REDIS_URL
    },
    'test': {
      'url': 'redis://h:password@localhost:6379/2'
    },
    '$default': {
      'url': 'redis://h:password@localhost:6379/2'
    }
  },

  'http': {
    'timeout': 10000
  },

  'heroku': {
    '$meta': 'Heroku-specific configuration options',
    'user_agent': require('./package.json').name,
    'api': 'api.heroku.com',
    'variant': 'application/vnd.heroku+json; version=3'
  }
};

// ---

const store = exports.store = new Confidence.Store(config);

exports.get = function (key) {

  return store.get(key, criteria);
};

exports.meta = function (key) {

  return store.meta(key, criteria);
};

