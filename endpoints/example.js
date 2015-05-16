const Joi = require('joi');


// ENDPOINTS
module.exports = [

  // usage: curl -d 'user[email]=johnny@heroku.com' http://localhost:3000/example
  {
    method: '*',
    path: '/example',

    config: {
      validate: {
        payload: Joi.object().keys({                 // required
          user: Joi.object().keys({                  // required
            name: Joi.string(),                      // optional
            email: Joi.string().email().required()   // required
          }).required()
        })
      },

      response: {
        schema: Joi.object().keys({                  // optional
          bank: Joi.object().keys({                  // optional
            balance: Joi.number().min(0).required(), // required
            asOf: Joi.date().iso().required()        // required
          })
        })
      }
    },

    handler: function (request, reply) {

      reply({
        bank: {
          balance: 54.32,
          asOf: new Date().toISOString()
        }
      });
    }
  },

  // curl -H 'Authorization: Bearer insert-oauth-token-here' http://localhost:3000/apps
  {
    method: 'get',
    path: '/apps',
    config: {
      plugins: {
        policies: ['isAuthenticated']
      }
    },
    handler: function(request, reply) {

      const api = request.app.api;
      api.get('/apps', function(error, response, apps) {
        reply(apps);
      });
    }
  }

];
