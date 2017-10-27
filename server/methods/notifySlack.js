import {
  Meteor
} from 'meteor/meteor';
import request from 'request'


Meteor.methods({
  notifySlack: function(message) {
    var url = 'url'
    var options = {
      method: 'post',
      body: message,
      json: true,
      url: url
    }
    request(options, function(err, res, body) {
      if (err) {
        console.error('error posting json: ', err)
      } else {
        console.log('body: ', body)
      }
    })
  }
});
