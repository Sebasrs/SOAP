let mongoose = require('mongoose');

let historySchema = mongoose.Schema({
  employeeName: String,
  soap: Number,
  alcohol: Number,
  paper: Number
});

let History = mongoose.model('History', historySchema);

module.exports = History;