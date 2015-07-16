#uku
![hero](http://cl.ly/image/0k2g0R0S1P3f/uku-vectorized.jpg)

## overview
uku is a [hapijs](http://hapijs.com/) boilerplate generator for slinging together APIs/microservices/what-have-yous. It's not *another* simple lightweight framework that scales and makes empty promises -- it's just a great practice for working with http in node.js.

As mentioned, it's based on [hapijs](http://hapijs.com/) -- an opensource framework that is maintained by [WalmartLabs](https://github.com/walmartlabs) and used internally to power their node.js efforst (including http://m.walmart.com). [It's been featured on http://nodejs.org for the past ~2 years](https://nodejs.org/video/).

## background
This project kicked off with the intent of simply being a boilerplate nodejs server that could be forked-and-customized for each project. These are the primary goals of the project:

+ the ability for uku-derived projects to reap the benefits of improvements to the uku-base project/ecosystem while avoiding merge conflicts
+ enable other teams to implement/test/deploy their project(s) independently of any other teams while leaving it trivial to absorb their work into a primary project (e.g. [longboard](https://github.com/heroku/longboard) which is used to provide [dashboard](http://github.com/heroku/dashboard-v6)-supporting server-side endpoints).
+ highly extensible and reusable but without being excessively-opinionated on what you build and deploy
+ avoid merge-conflicts inherent when working on large projects spanning multiple teams

## digging in
It turned out most of our needs are met by the hapijs-ecosystem itself. I initially started building a module that would load plugins and export one server -- only to discover that [glue](https://github.com/hapijs/glue) does precisely that. So that's `index.js` :).

> Glue exports a single function `compose` accepting a JSON manifest file specifying the Hapi server options, connections and plugins. Glue primarily works in synergy with Rejoice, but can be integrated directly into any Hapi application loader.

When you create an uku project, you'll find that it requires the uku module and feeds it a manifest file:

```js
/* some content omitted for brevity */

const manifest = {
  server: {
    load: config.get('/server/load'),
    debug: {
      request: ['error']
    }
  },

  connections: [{
    port: config.get('/server/port')
  }],

  plugins: plugins
};

/* some content omitted for brevity */

exports.run = function run () {

  return Uku.run(manifest, options);
};
```

## installation
```
npm install -g heroku/uku
```

## usage
```
$ uku help
Commands:
  project  Create a new uku project
  plugin   Generate a plugin

Options:
  --help  Show help                                                    [boolean]

peace, love, recycle
```

### generate a new project
```
$ uku project my-project
my-project intialized at /Users/johnny/Desktop/my-project
Installing dependencies...

# npm output omitted for brevity

Dependency installation completed.
```

The generated project will resemble [what you find here](https://github.com/heroku/uku/tree/master/lib/generators/templates/project).

#### what you get out of the box
+ [newrelic](https://github.com/newrelic/node-newrelic) support via [uku](https://github.com/heroku/uku/blob/master/index.js#L1)
+ [rollbar](https://github.com/rollbar/node_rollbar) support via [icecreambar](https://github.com/yayuhh/icecreambar)
+ [forever](https://github.com/foreverjs/forever) for ensuring that a given script runs continuously
+ [lab](https://github.com/hapijs/lab) unit testing
  - originally a fork of mocha; very similar syntax
  - 100% code coverage out of the box
  - a few examples to get you started
+ [eslint](http://eslint.org) with a configured [.eslintrc](https://github.com/heroku/uku/blob/master/lib/generators/templates/project/.eslintrc)
+ recommended plugins such as
  - [icecreambar](https://github.com/yayuhh/icecreambar) (rollbar -- as mentioned above)
  - [hapi-requre-https](https://www.npmjs.com/package/hapi-require-https) to ensure we only handle https requests *in production*
+ a convenient way to [require additional plugins](https://github.com/heroku/uku/blob/master/lib/generators/templates/project/plugins.js) in `./plugins.js`, including the ability to declare production-only plugins (e.g. https enforcement)
+ [confidence](https://github.com/hapijs/confidence) and an accompying `config.js` which provides a great way to reference ENV-dependent values without polluting your code conditionals.
+ a valid `package.json`


### generate a new plugin
```
$ uku plugin my-plugin
my-plugin intialized at /Users/johnny/Desktop/my-plugin
Installing dependencies...

# npm output omitted for brevity

Dependency installation completed.
```

#### what you get out of the box
+ a [vanilla hapi plugin](https://github.com/heroku/uku/blob/master/lib/generators/templates/plugin/index.js)
+ [lab](https://github.com/hapijs/lab) unit testing
  - originally a fork of mocha; very similar syntax
  - 100% code coverage out of the box
  - a few examples to get you started
+ [eslint](http://eslint.org) with a configured [.eslintrc](https://github.com/heroku/uku/blob/master/lib/generators/templates/plugin/.eslintrc)
+ a valid `package.json`
