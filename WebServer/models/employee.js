let mongoose = require('mongoose');

let employeeSchema = mongoose.Schema({
  name: String,
  lastName: String,
  entryTime: Date,
  departureTime: Date,
  id: Number
});

let Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;