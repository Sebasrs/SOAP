module.exports = (app, History) => {

  app.get('/history', (req, res) => {
    History.find({}, function(err, history) {
      if (err) console.log(err);

      res.send(history);
    })
  });      
};