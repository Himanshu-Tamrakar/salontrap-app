import {
  Meteor
} from 'meteor/meteor';
import {
  Bookings
} from '../../imports/api/bookings'

Meteor.methods({
  /**
   * confirmBooking
   * @param object Booking related all details
   **/
  'confirmBooking': function(object) {
    Future = Npm.require('fibers/future');
    var myFuture = new Future();
    object.date = new Date();
    Bookings.insert(object, function(error) {
      if (error) {
        console.log("Booking not confired");
        myFuture.return(false)
      } else {
        console.log("booking inserted Successfully");
        myFuture.return(true)
      }
    })

    return myFuture.wait();
  }
});
