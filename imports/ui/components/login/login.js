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



    $timeout(function() {
      $('.carousel.carousel-slider').carousel({
        fullWidth: true
      });
    }, 10);

  }



  loginWithFacebook() {
    $scope = this.scope;
    Meteor.loginWithFacebook({
      requestPermissions: ['public_profile', 'email']
    }, function(error) {
      if (error) {
        console.log(error);
      } else {
        $('.modal').modal('close');
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
        $('.modal').modal('close');
        Materialize.toast('Wecome! You are successfully loggedin', 4000);
      }
    })
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
