//
// READ ME (srsly!)
//
// plugins need to be referenced via relative path from __dirname/node_modules
// i.e. a plugin in /my-project/plugins/foo.js
//      would be referenced via `../plugins/foo`
//

exports.production = {
  './hapi-require-https': {}
};

exports.always = {

};
