const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

const db = require('./repository/mood.repo');
db.connect();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Track your mood by interacting with this handy rest api! Moods are found at /moods');
});

app.get('/mood', async (req, res) => {
  try {
      let moods = await db.getMoods();
      res.send(moods);
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
});

app.post('/mood', async (req, res) => {
  try {
    await db.saveMood(req.body);
    res.status(200).send()
  } catch(error) {
    console.log(error);
    res.status(500).send()
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
