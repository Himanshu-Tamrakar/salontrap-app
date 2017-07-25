import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(function() {
  Accounts.onCreateUser(function(options, user) {
    if (user.services.hasOwnProperty('facebook')) {
      console.log('Log: User logging in with Facebook');

      const name = user.services.facebook.name;
      const gender = user.services.facebook.gender;
      const email = user.services.facebook.email;

      user.profile = {
        name: name,
        gender: gender,
        email: email,
        verify: false
      }
    } else if (user.services.hasOwnProperty('google')) {
          const name = user.services.google.name;
          const gender = user.services.google.gender;
          const email = user.services.google.email

          user.profile = {
            name: name,
            gender: gender,
            email: email,
            verify: false
          }
      }
    return user;
  });
});
