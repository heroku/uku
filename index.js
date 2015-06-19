const Glue = require('glue');

exports.run = function(manifest, options, ready) {

  Glue.compose(manifest, options, function(err, server) {

    if (err) {

      return ready(err);
    }

    else {

      return server.start(ready.bind({ server:server }));
    }
  });

};
