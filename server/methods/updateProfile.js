import {
  Meteor
} from 'meteor/meteor';

Meteor.methods({
  /**
   * confirmBooking
   * @param object Booking related all details
   **/
  'updateProfile': function(object) {
    this.unblock()
    Meteor.users.update({
      '_id': Meteor.userId()
    }, {
      $set: {
        'profile.email': object.email,
        'profile.phoneNumber': object.phoneNumber,
        'profile.dob': object.dob,
        'profile.address': object.address
      }
    }, function(error) {
      if (error) {
        console.log("update profile error");
      } else {
        console.log("profile updated");
      }
    })

  }
});
