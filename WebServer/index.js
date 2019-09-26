const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const history = require('./models/history');
const employee = require('./models/employee');

const app = express();
const port = 3001

app.use(bodyParser.json());

mongoose.connect('mongodb://admin1:TOBEema11@soabaths-shard-00-00-xabgf.mongodb.net:27017,soabaths-shard-00-01-xabgf.mongodb.net:27017,soabaths-shard-00-02-xabgf.mongodb.net:27017/database1?ssl=true&replicaSet=SOABaths-shard-0&authSource=admin&retryWrites=true&w=majority')

app.get('/', (req, res) => {
  res.send('Running')
});

require('./routes/historyRoutes')(app, history);
require('./routes/employeeRoutes')(app, employee);
require('./mqttLogic/mqtt')(app, history, employee);

app.listen(port, ()  => {
  console.log(`Listening on port ${port}`)
});