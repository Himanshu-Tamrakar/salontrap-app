import {
  Meteor
} from 'meteor/meteor';
import request from 'request'


Meteor.methods({
  notifySlack: function(message) {
    var url = 'https://hooks.slack.com/services/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'
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
