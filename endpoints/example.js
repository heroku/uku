const Joi = require('joi');


// SCHEMAS
const EXPECTED_INCOMING_SCHEMA =
Joi.object().keys(
  {
    user: Joi.object().keys({                  // required
      name: Joi.string(),                      // optional
      email: Joi.string().email().required()   // required
    }).required()
  }
);

const EXPECTED_OUTGOING_SCHEMA =
Joi.object().keys(
  {
    bank: Joi.object().keys({                  // optional
      balance: Joi.number().min(0).required(), // required
      asOf: Joi.date().iso().required()              // required
    })
  }
);


// ENDPOINTS
module.exports = [

  // usage: curl -d 'user[email]=johnny@heroku.com' http://localhost:3000/example
  {
    method: 'POST',
    path: '/example',
    config: {
      validate: { payload: EXPECTED_INCOMING_SCHEMA },
      response: { schema: EXPECTED_OUTGOING_SCHEMA }
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
