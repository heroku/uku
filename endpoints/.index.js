const fs = require('fs');
const Path = require('path');
const Hoek = require('hoek');

const endpoints = [];

fs
  .readdirSync(__dirname)
  .filter(function (file) {

    const fileIsNotHidden = (file.indexOf('.') !== 0);
    const fileIsNotIndexJs = (file !== 'index.js');

    return fileIsNotHidden & fileIsNotIndexJs;
  })
  .forEach(function (file) {

    const additionalEndpoints = require(Path.join(__dirname, file));
    Hoek.merge(endpoints, additionalEndpoints);
  });

module.exports = endpoints;
