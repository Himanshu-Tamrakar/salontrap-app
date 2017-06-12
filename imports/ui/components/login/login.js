import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import template from './login.html';
import uiRouter from '@uirouter/angularjs';
// import ngSanitize from 'angular-sanitize';
import {
  Meteor
} from 'meteor/meteor';

class Login {
  constructor($scope, $reactive, $timeout) {
    'ngInject';

    $reactive(this).attach($scope);
    this.scope = $scope;

    this.phoneNumber = "";
    this.otp = "";
    $scope.first = true;
    $scope.second = false;
    $scope.third = false;

    $scope.chageValue = function(first, second, third) {
      $timeout(function() {
        $scope.first = first;
        $scope.second = second;
        $scope.third = third;
      }, 30);
    }



    $timeout(function() {
      $('.carousel.carousel-slider').carousel({
        fullWidth: true
      });
    }, 10);

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

  oneStepBack() {
    $scope = this.scope;
    if ($scope.third) {
      $scope.chageValue(false, true, false)
    } else if ($scope.second) {
      $scope.chageValue(true, false, false)
    }

  }
  loginWithFacebook() {
    $scope = this.scope;
    Meteor.loginWithFacebook({
      requestPermissions: ['public_profile', 'email']
    }, function(error) {
      if (error) {
        console.log(error);
      } else {
        if (!Meteor.user().profile.verify) {
          $scope.chageValue(false, true, false);
        }
        console.log("logged in successfully");
      }
    })
  }

  sendOtp() {
    phoneNumber = this.phoneNumber;
    checkPhoneNumber = this.checkPhoneNumber;
    $scope = this.scope;

    if (checkPhoneNumber(phoneNumber)) {
      Meteor.call('sendOtp', phoneNumber, function(error, result) {
        if (error) {
          console.log('%cUnable to send SMS @ hiyo.js:Hiyo:sendLink()', 'color: red');
        } else {
          console.log("SMS send successfully");
          if (result) {
            $scope.chageValue(false, false, true);
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
          $scope.chageValue(true, false, false);
          console.log("otp successfully verified");
        }
      })
    } else {
      console.log("not match");
    }
  }
}

const name = 'login';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial
  // ngSanitize
]).component(name, {
  template,
  controllerAs: name,
  controller: Login
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/user/sign_in',
      template: '<login></login>'
    });
}
