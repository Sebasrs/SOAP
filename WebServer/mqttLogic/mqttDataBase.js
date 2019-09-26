let weight, ultrasonic1, ultrasonic2, rfid;
let lastHour, lastDate;

function  writeDataBase(history, employee) {

  employee.findOne({id: rfid}, function(err, empl) {
    if (err) console.log(err);

    let newHistory = {
      employeeName: empl.name,
      soap: ultrasonic1,
      alcohol: ultrasonic2,
      paper: weight,
      date: lastDate,
      hour: lastHour
    }; 

    history.create(newHistory, function(err) {
      if (err) console.log(err);
      console.log('History created successfully.');
    });
  }); 
}

module.exports = (history, employee, topic, message) => {
  let dataBaseInfo = message.toString().split(",");

  switch(topic){
    case "/user1/weight":
      weight = dataBaseInfo[2];
      break;
    case "/user1/ultrasonic/1":
      ultrasonic1 = dataBaseInfo[2];
      break;
    case "/user1/ultrasonic/2":
      ultrasonic2 = dataBaseInfo[2];
      break;
    case "/user1/rfid":
      rfid = dataBaseInfo[2];
      lastHour = dataBaseInfo[1];
      lastDate = dataBaseInfo[0];
      writeDataBase(history, employee);
      break;
    default:
      break;
  }
};