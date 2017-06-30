import angular from 'angular';
import angularMeteor from 'angular-meteor';
import webTemplate from './checkout.html';
import mobileTemplate from './checkout.mobile.html';
import uiRouter from '@uirouter/angularjs';
import {
  Meteor
} from 'meteor/meteor';
import {
  Bookings
} from '../../../api/bookings'

class Checkout {
  constructor($scope, $stateParams, $reactive, $timeout, $state, $rootScope) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;
    this.rootScope = $rootScope;

    this.stateParams = $stateParams;

    $scope.first = true;
    $scope.second = false;
    $scope.totalPay = 0;
    this.phoneNumber = "";
    this.otp = "";

    this.selectedDate = null;
    // this.selectedTime = null;

    $scope.finalPrice = function(price, discount) {
      return price - ((price * discount) / 100);
    }

    $scope.chageValue = function(first, second) {
      $timeout(function() {
        $scope.first = first;
        $scope.second = second;
      }, 30);
    }

    $scope.mobileVerifyModelInitilize = function() {
      $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        },
        complete: function() {} // Callback for Modal close
      });
    };

    $timeout(function() {
      const Items = $stateParams.selectedItemsObject
      if (Items !== null) {
        Items.forEach(function(object) {
          $scope.totalPay += (object.price - ((object.price * object.discount) / 100));
        })
      }

      $(document).ready(function() {
        $('ul.tabs').tabs();
      });

      $('#datepicker').pickadate({
        min: true,
        max: 15
      });



    }, 100);

    this.helpers({
      checkedOutItems() {
        return $stateParams.selectedItemsObject;
      },
      canBook() {
        if (Meteor.userId()) {
          return true;
        } else {
          return false;
        }
      }
    });

  }

  confirmBooking() {
    console.log("inside canfirmBooking");
    $scope = this.scope;
    $stateParams = this.stateParams;
    $state = this.state;

    const userId = Meteor.userId()
    const user = Meteor.users.findOne(userId)
    const salonId = $stateParams.salonId;
    const serviceId = $stateParams.serviceId;
    const selectedItemsObject = $stateParams.selectedItemsObject;
    const price = $scope.totalPay;
    const selectedDate = this.selectedDate;
    const selectedTime = document.getElementById("myTime").value;
    const object = {
      'userId': userId,
      'salonId': salonId,
      'serviceId': serviceId,
      'selectedItemsObject': selectedItemsObject,
      'price': price,
      'date': null,
      'bookingDate': selectedDate,
      'bookingTime': selectedTime,
      'isCancel': false,
      'cancelBy': null,
      'markAsComplete': false
    }

    if (!$stateParams.selectedItemsObject) {
      Materialize.toast('Please Select Some Services', 5000)
      return;
    }

    if (selectedDate && selectedTime && $stateParams.selectedItemsObject.length > 0 && user.profile.verify) {
      Meteor.call('confirmBooking', object, function(error, result) {
        if (error) {
          Materialize.toast('Booking Not Confired', 5000)
        } else {
          if (result) {
            Materialize.toast('Booking Done!', 5000)
            $state.go('home')
          }
        }
      })
    } else if (!selectedDate) {
      Materialize.toast('Please Select Date', 5000)
    } else if (!selectedTime) {
      Materialize.toast('Please Select Time', 5000)
    } else if ($stateParams.selectedItemsObject.length === 0) {
      Materialize.toast('Please Select Some Services', 5000)
    } else if (!user.profile.verify) {
      $('#mobile-verify-modal').modal('open');
    }
  }

  checkPhoneNumber = function(phoneNumber) {
    var regex = /^\d{10}$/;
    if (phoneNumber.match(regex)) {
      return true;
    } else {
      Materialize.toast('Please enter valid mobile number', 4000);
      return false;
    }
  }

  sendOtp() {
    phoneNumber = this.phoneNumber;
    checkPhoneNumber = this.checkPhoneNumber;
    $scope = this.scope;

    if (checkPhoneNumber(phoneNumber)) {
      Meteor.call('sendOtp', phoneNumber, function(error, result) {
        if (error) {
          Materialize.toast('Sending Opt Unsuccessfull', 4000);
        } else {
          Materialize.toast('Opt Sent successfully', 4000);
          if (result) {
            $scope.chageValue(false, true);
          }
        }
      });
    }
  }

  verifyOpt() {
    if (parseInt(Meteor.user().profile.otp.toString()) == parseInt(this.otp)) {
      Meteor.users.update({
        '_id': Meteor.userId()
      }, {
        $set: {
          'profile.verify': true
        }
      }, function(error) {
        if (!error) {
          $('.modal').modal('close');
          Materialize.toast('Mobile Verified Successfull', 4000);
        }
      })
    } else {
      Materialize.toast("OPT didn't match", 4000);
    }
  }

}

const name = 'checkout';
const template = Meteor.Device.isPhone() ? mobileTemplate : webTemplate;

export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Checkout
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('checkout', {
      params: {
        'selectedItemsObject': null,
        'salonId': null,
        'serviceId': null
      },
      url: '/checkout',
      template: '<checkout></checkout>'
    });
}
