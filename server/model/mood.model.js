const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MoodEntrySchema = new Schema({
    timestampUtc: {type: Date, required: true},
    mood: {type: Number, required: true},
    feelings: {type: [String], required: true},
    comments:{ type: String }
});

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);
