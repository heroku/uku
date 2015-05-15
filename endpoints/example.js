const Joi = require('joi');


// ENDPOINTS
module.exports = [

  // usage: curl -d 'user[email]=johnny@heroku.com' http://localhost:3000/example
  {
    method: 'POST',
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
      /* const db = request.server.app.db; */

      reply({
        bank: {
          balance: 54.32,
          asOf: new Date().toISOString()
        }
      });
    }
  }

];
