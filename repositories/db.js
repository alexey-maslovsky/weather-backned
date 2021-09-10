const Loki = require('lokijs');

const db = new Loki('db');

const WeatherCollection = db.addCollection('WeatherCollection');

module.exports = {
  db,
  WeatherCollection,
};