import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './checkout.html';
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

    $scope.totalPay = 0;

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

      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });

    }, 100);

    this.helpers({
      checkedOutItems() {
        return $stateParams.selectedItemsObject;
      },
      canBook() {
        if ($stateParams.selectedItemsObject && $stateParams.salonId && $stateParams.serviceId) {
          if (Meteor.userId() && $stateParams.selectedItemsObject.length > 0) {
            return true;
          } else {
            return false;
          }
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
      'isCancel':false,
      'cancelBy':null,
      'markAsComplete':false
    }

    if (selectedDate) {
      Meteor.call('confirmBooking', object, function(error, result) {
        if (error) {
          console.log("booking not done");
        } else {
          if (result) {
            console.log("bookings done");
            $state.go('home')
          } else {
            console.log("Insersion error");
          }
        }
      })
    } else if (!selectedDate) {
      console.log("Please select Date");
    } else if (!selectedTime) {
      console.log("Please select Time");
    }
  }
}

const name = 'checkout';

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
