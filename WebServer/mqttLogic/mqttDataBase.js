let weight, ultrasonic1, ultrasonic2, rfid;

function  writeDataBase(history, employee) {
  console.log(weight + " " + ultrasonic1 + " " + ultrasonic2 + " " + rfid);

  employee.findOne({id: rfid}, function(err, empl) {
    if (err) throw err;

    let newHistory = {
      employeeName: empl.name,
      soap: ultrasonic1,
      alcohol: ultrasonic2,
      paper: weight
    };

    history.create(newHistory, function(err) {
      if (err) throw err;
      console.log('History created successfully.');
    });
  }); 
}

module.exports = (history, employee, topic, message) => {

  switch(topic){
    case "/user1/weight":
      weight = message;
      break;
    case "/user1/ultrasonic/1":
      ultrasonic1 = message;
      break;
    case "/user1/ultrasonic/2":
      ultrasonic2 = message;
      break;
    case "/user1/rfid":
      rfid = message;
      writeDataBase(history, employee);
      break;
    default:
      break;
  }
};