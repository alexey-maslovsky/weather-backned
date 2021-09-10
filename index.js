const express = require('express');
const bodyParser = require('body-parser');
const Async = require('./middlewares/Async');
const WeatherService = require('./services/WeatherService');

const app = express();
const port = 5000;

const weatherService = new WeatherService();

app.use(bodyParser.json());

app.get('/api/weather/:name', Async(async (req, res) => {
  const { data } = await weatherService.search(req.params.name);

  res.send(data);
}));

app.get('/api/weather/:name/comments', Async(async (req, res) => {
  const { comments } = await weatherService.search(req.params.name);

  res.send(comments);
}));

app.post('/api/weather/:name/comments', Async(async (req, res) => {
  console.log(req.body);
  const comment = await weatherService.addComment(req.params.name, req.body);

  res.send(comment);
}));

app.get('/api/weather/:name/likes', Async(async (req, res) => {
  const { likes } = await weatherService.search(req.params.name);

  res.send({ likes });
}));

app.post('/api/weather/:name/likes', Async(async (req, res) => {
  await weatherService.addLike(req.params.name, 1);

  res.send({});
}));

app.delete('/api/weather/:name/likes', Async(async (req, res) => {
  await weatherService.addLike(req.params.name, -1);

  res.send({});
}));

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});
