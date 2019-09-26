module.exports = (app, History) => {

  app.get('/history', (req, res) => {
    History.find({}, function(err, history) {
      if (err) throw err;

      console.log(history);
      res.send(history);
    })
  });      
};