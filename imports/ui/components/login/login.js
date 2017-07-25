import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
// import template from './login.html';
import uiRouter from '@uirouter/angularjs';
import webTemplate from './login.html';
import mobileTemplate from './login.mobile.html';
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
        } else {
          $('.modal').modal('close');
        }
        Materialize.toast('Wecome! You are successfully loggedin', 4000);
      }
    })
  }

  loginWithGoogle() {
    $scope = this.scope;
    Meteor.loginWithGoogle({
      requestPermissions: ['https://www.googleapis.com/auth/contacts.readonly', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    }, function(error) {
      if (error) {
        console.log(error);
      } else {
        if (!Meteor.user().profile.verify) {
          $scope.chageValue(false, true, false);
        } else {
          $('.modal').modal('close');
        }
        Materialize.toast('Wecome! You are successfully loggedin', 4000);
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
          Materialize.toast('Sending Opt Unsuccessfull', 4000);
        } else {
          Materialize.toast('Opt Sent successfully', 4000);
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
          $('.modal').modal('close');
          Materialize.toast('Mobile Verified Successfull', 4000);
        }
      })
    } else {
      Materialize.toast("OPT didn't match", 4000);
    }
  }
}

const name = 'login';
const template = Meteor.Device.isPhone() ? mobileTemplate : webTemplate;

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
