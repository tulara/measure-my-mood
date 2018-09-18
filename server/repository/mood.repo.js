const mongoose = require('mongoose');
const host = process.env.MONGO_HOST || "192.168.99.100";
const url = `mongodb://${host}:27017/app`;

const MoodEntry = require('../model/mood.model');
var db;

connect = () => {
  mongoose.connect(url,{
  keepAlive: true,
  reconnectTries: 2
});
  mongoose.Promise = global.Promise;
  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

saveMood = async (saveRequest) => {
  return new Promise((resolve, reject) => {

    var moodEntry = new MoodEntry(saveRequest);

    moodEntry.save((err) => {
      if (err) {
        console.log(err);
        reject(Error("Failed to save moodEntry"));
      }
      resolve();
    });
  });
}

getMoods = () => {
  return new Promise((resolve, reject) => {
    MoodEntry.find({})
            .sort({timestampUtc: -1})
            .exec((err, moods) => {
              if (err) {
                console.log(err);
                reject(Error("Failed to retrieve moods"));
              }
              resolve(moods);
            });
  });
}

module.exports = {
  connect: connect,
  saveMood: saveMood,
  getMoods: getMoods
};
