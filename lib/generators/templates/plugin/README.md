# uku-plugin-name
[description of plugin]

## how to use
when writing a plugin for [uku](https://github.com/heroku/uku), consider the following example:

```js
exports.register = function myPlugin(server, options, next) {

  const plugins = [{ register: require('uku-bearer-token') }];

  // register all the plugins
  server.register(plugins, (err) => {
    if (err) { throw err; }

    server.route({
      method: 'get',
      path: '/',
      handler: function(request, reply) {
        reply(`your bearer token is ${request.app.bearer}`);
      }
    });

    next();
  });
};

exports.register.attributes = {
  name: 'uku-my-plugin',
  version: 1
};

```

## what it does
[explanation of what this plugin accomplishes]

## what it doesn't
[anything you want to add extra emphasis to]

## options
[options that you may pass to this plugin when initalizing it]

## example
[copy/pasteable usage examples]
