const fs = require('fs');
const Path = require('path');
const Hoek = require('hoek');

const endpoints = [];
const exclude = ['helpers.js'];

fs
  .readdirSync(__dirname)
  .filter(function (file) {

    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (exclude.indexOf(file) < 0);
  })
  .forEach(function (file) {

    const additionalEndpoints = require(Path.join(__dirname, file));
    Hoek.merge(endpoints, additionalEndpoints);
  });

module.exports = endpoints;
