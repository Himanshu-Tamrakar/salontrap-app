import request from 'request';
import {
  Meteor
} from 'meteor/meteor';

Meteor.methods({
  /**
   * Send OTP SMS
   * @param User Contact Number
   * @param userId current logged in user id
   */
  'sendOtp': function(contact) {

    Future = Npm.require('fibers/future');
    var myFuture = new Future();

    //OTP Code Generation
    var code = Math.floor(Random.fraction() * 10000);
    if (code < 1000) {
      temp = (1000 - code);
      code = code + temp;
      code = code + Math.floor(Random.fraction() * 1000)
    }

    const otp = code;
    var to = contact;
    var body = "Hiyo, Please use " + otp + " as the code to verify your mobile number.";
    var payload = {
      from: '040-395-60705',
      To: to,
      Body: body,
      Priority: 'high'
    }

    request.post('https://hiyoapp:1f258cf4e6e8de9d986a32d63fd0c736261430d2@twilix.exotel.in/v1/Accounts/hiyoapp/Sms/send', {
      form: payload
        //headers: headers
    }, Meteor.bindEnvironment(function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        console.log('HiyoLog::sendOtp.js:Meteor.method():sendOtp(): OPT send successfully');
        Meteor.users.update({
          _id: Meteor.userId()
        }, {
          $set: {
            'profile.otp': otp,
            'profile.phoneNumber': to,
          }
        }, function(error) {
          if (!error) {
            myFuture.return(true);
          } else {
            myFuture.return(false);
          }
        });
      } else {
        console.log(response.statusCode);
        console.log(body);
        myFuture.return(false);
      }
    }));

    return myFuture.wait();
  },

  'sendSMS': function(contact, message) {
    this.unblock()

    var to = contact;
    var body = message
    var payload = {
      from: '040-395-60705',
      To: to,
      Body: body,
      Priority: 'high'
    }

    request.post('https://hiyoapp:1f258cf4e6e8de9d986a32d63fd0c736261430d2@twilix.exotel.in/v1/Accounts/hiyoapp/Sms/send', {
      form: payload
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('SalonTrap: SMS Sent successfully');
      } else {
        console.log('SalonTrap: SMS doen not Sent successfully');
      }
    });
  }
});
