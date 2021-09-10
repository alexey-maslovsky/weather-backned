const axios = require('axios');
const { WeatherCollection } = require('../repositories/db');
const uniqid = require('uniqid');

const URL = 'https://goweather.herokuapp.com/weather/';

class WeatherService {
  async search(name) {
    const weatherData = await WeatherCollection.findOne({ name: name.toLowerCase() });

    if (weatherData) {
      return weatherData;
    }

    const { data } = await axios(URL + '/' + name);

    const addedData = await WeatherCollection.insertOne({
      name: name.toLowerCase(),
      data,
      likes: 0,
      comments: [],
    });

    return addedData;
  }

  async addLike(name, count) {
    const weatherData = await WeatherCollection.findOne({ name: name.toLowerCase() });

    if (!weatherData) {
      return null;
    }

    weatherData.likes = weatherData.likes + count;
    await WeatherCollection.update(weatherData);
  }

  async addComment(name, data) {
    const weatherData = await WeatherCollection.findOne({ name: name.toLowerCase() });

    if (!weatherData) {
      return null;
    }

    const comment = {
      id: uniqid(),
      name: data.name,
      text: data.text,
    };

    weatherData.comments = [...weatherData.comments, comment];
    await WeatherCollection.update(weatherData);

    return comment;
  }
}

module.exports = WeatherService;
