'use strict';
// const
//     spawn = require( 'child_process' ).spawnSync,
//     ls = spawn( 'ls', [ '-lh', '/usr' ] );
const exec = require('child_process').exec;

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');
var TeleSignSDK = require('telesignsdk');


exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.register = function(req, res) {
//
//   const child = exec('wallet -h http://127.0.0.1:3232/bws/api send mhnstvqGhwdbwYRctKyJi7pBcjNSPH34Xv ' + amount +'bit',
//     (error, stdout, stderr) => {
//         console.log(`stdout: ${stdout}`);
//         console.log(`stderr: ${stderr}`);
//         if (error !== null) {
//             console.log(`exec error: ${error}`);
//         }
// });

  const code = makeid(); //(""+Math.random()).substring(2,7);
    var customerId = "4E04D90F-626B-49A2-A72F-D8DF009A8193"; // find in portal.telesign.com
    var apiKey = "4ijdxPoc8cJOWHbtk8d4u1GepYDFzfGqrBey5a7URAy7egCNWPbOmmt0eXMPh278ltlqifwdkRnxqM9aLx7fZw==";
    var restEndpoint = "https://rest-api.telesign.com";
    var timeout = 10*1000; // 10 secs

    var telesign = new TeleSignSDK( customerId,
        apiKey,
        restEndpoint,
        timeout // optional
    );

    var phoneNumber = req.params.phone; // Your end user’s phone number, as a string of digits without spaces or
    // punctuation, beginning with the country dialing code (for example, “1” for North America)
    var message = "Verification code for live wire: " + code;
    var messageType = "OTP"; // ARN = Alerts, Reminders, and Notifications; OTP = One time password; MKT = Marketing
    var referenceId = 123; // need this to check status later

    telesign.sms.message(function(err, reply){
            if(err){
                console.log("Error: Could not reach TeleSign's servers");
                console.error(err); // network failure likely cause for error
            }
            else{
                console.log("YAY!, the SMS message is being sent now by TeleSign!");
                console.log(reply);
                referenceId=reply.reference_id; // save the reference_id to check status of the message
            }
        },
        phoneNumber,
        message,
        messageType
    );
  var new_task = new Task({name: req.params.name, phone: req.params.phone, amount: 1000});
  console.log(new_task);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json({code: code});
  });
};
//
// exports.register = function(req, res) {
//   var new_task = new Task(req.params.name);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

exports.read_a_task = function(req, res) {
  Task.findOne({name: req.params.name}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({name: req.params.from}, {$inc: {amount: -req.params.amount}}, {new: true}, function(err, task) {
    if (err)
      res.send(err);
  Task.findOneAndUpdate({name: req.params.to}, {$inc: {amount: req.params.amount}}, {new: true}, function(err, task) {
    if (err)
      res.send(err);

    var amount = req.params.amount*1000;

const child = exec('wallet -h http://127.0.0.1:3232/bws/api send mhnstvqGhwdbwYRctKyJi7pBcjNSPH34Xv ' + amount +'bit',
    (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
});

    res.json(task);
  });
  });

};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};