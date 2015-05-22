const fs = require('fs');
const Path = require('path');

const endpoints = [];

fs
  .readdirSync(__dirname)
  .filter((file) => {

    const fileIsNotHidden = (file.indexOf('.') !== 0);
    const fileIsNotIndexJs = (file !== 'index.js');

    return fileIsNotHidden & fileIsNotIndexJs;
  })
  .map(function (file) {
    return require(Path.join(__dirname, file));
  })
  .forEach((nextEndpoint) => {
    endpoints.push(nextEndpoint);
  });

module.exports = endpoints;
