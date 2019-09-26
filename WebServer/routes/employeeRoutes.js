module.exports = (app, Employee) => {

  app.post('/employee', (req, res) => {
    let newEmployee = {
      name: req.body.name,
      lastName: req.body.lastName,
      entryTime: "2010-01-01T18:30:00",
      departureTime: "2010-01-01T20:30:00",
      id: 334643
    };
    
    Employee.create(newEmployee, function(err) {
      if (err) throw err;
      console.log('User created successfully.');
    });

    res.send("Ok");
  });    
  
  app.get('/employee', (req, res) => {
    Employee.find({}, function(err, employee) {
      if (err) throw err;

      res.send(employee);
    })
  }); 
};