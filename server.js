'use strict';

// dependencies
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);
const sms = require('./controllers/smsController.js');
const mysql = require('mysql');
const schedule = require('node-schedule');
const moment = require('moment');
const route = require('./routes/routes.js');
const loginRoutes = require('./routes/loginRoutes.js');

// setting up express server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({  
//   store: new RedisStore({
//     url: config.redisStore.url
//   }),
//   secret: config.redisStore.secret,
//   resave: false,
//   saveUninitialized: false
// }));

// connecting to server
app.use(passport.initialize()); 
app.use(passport.session());
const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// creating connection to mysql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  // Your username
  user: "",
  // Your password
  password: "",
  database: "taskBadger"
});

app.use(route);
app.use(loginRoutes);

// connecting to database 
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
// });

// badger function to send text messages to users
function badger(phone_number, message) {
  // sending Badger SMS message
    // Sending SMS via Nexmo
    sms.message.sendSms(
      process.env.FROM_NUMBER, phone_number, message, {type: 'unicode'},
      (err, responseData) => {
    	  if (responseData) {
	    	  console.log(responseData);
	    }
          res.end(JSON.stringify(responseData));
	  });
};


var taskChecking =  function(err, res, fields) {
  // handle error
  if (err) throw err;
  var badgerList = [];
  // loop through tasks, pick out ones whose deadlines have passed, then add to badgerList array
  for (let row of res) {
    var dueDate = moment(row.deadline).valueOf();
    if (dueDate <= currentTime) {
      badgerList.push(row);
    }
  }
  for (let row of badgerList) {
      // if complete = false, run badger function
      if (row.complete !== false) {
        badger(row.phone_number,"Hey there! I noticed there's a task you haven't completed! Maybe you should get on that!");
      } 
    }
};


// setting up task checker function
function taskQuery() {
  var currentTime = moment().valueOf();
  // tell database "give me all the tasks that haven't been completed" 
  connection.query("SELECT * FROM tasks WHERE complete = ?", [false], taskChecking  );
};


// every ten minutes, check for completion of task
    // run badger function every ten minutes for all incomplete tasks for which the deadline time has passed
schedule.scheduleJob('* /10 * * * *', taskQuery);