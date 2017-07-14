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
import {
  Shops
} from '../../../api/shops'

class Checkout {
  constructor($scope, $stateParams, $reactive, $timeout, $state, $rootScope) {
    'ngInject';

    $reactive(this).attach($scope);

    window.scrollTo(0, 0);
    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;
    this.rootScope = $rootScope;

    this.stateParams = $stateParams;


    this.selectedDate = null;
    // this.selectedTime = null;

    $scope.finalPrice = function(price, discount) {
      return price - ((price * discount) / 100);
    }

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
    const salon = Shops.findOne({
      '_id': salonId
    })
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
      'date': new Date(),
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

    if (selectedDate && selectedTime && $stateParams.selectedItemsObject.length > 0) {
      Meteor.call('confirmBooking', object, function(error, result) {
        if (error) {
          Materialize.toast('Booking Not Confired', 5000)
        } else {
          if (result) {
            Materialize.toast('Booking Done! Please Check Your Profile For Booking Updates', 5000)
            $state.go('home');
          }
        }
      })
    } else if (!selectedDate) {
      Materialize.toast('Please Select Date', 5000)
    } else
    if (!selectedTime) {
      Materialize.toast('Please Select Time', 5000)
    } else if ($stateParams.selectedItemsObject.length === 0) {
      Materialize.toast('Please Select Some Services', 5000)
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
