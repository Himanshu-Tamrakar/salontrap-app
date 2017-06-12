import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import template from './navigation.html';
import {
  name as Login
} from '../login/login'
import {
  name as Profile
} from '../profile/profile'

class Navigation {
  constructor($scope, $reactive, $state, $timeout) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.state = $state;

    $scope.loginModelInitilize = function() {
      $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
          // alert("Ready");
          // console.log(modal, trigger);
        },
        complete: function() {
            // alert('Closed');
          } // Callback for Modal close
      });
    };

    $timeout(function() {
      $(".dropdown-button").dropdown();
    }, 10);

    this.helpers({
      isUserLoggedIn() {
        const userId = Meteor.userId()
        if (userId) {
          return true;
        } else {
          return false;
        }
      }
    })
  }
  logout() {
    Meteor.logout(function(error) {
      if (error) {
        console.log("Not loggedout");
      } else {
        console.log("looged out successfully");
      }
    })

  }
}

const name = 'navigation';

// Module
export default angular.module(name, [
  angularMeteor,
  Login,
  ngMaterial,
  uiRouter,
  Profile
]).component(name, {
  template,
  controllerAs: name,
  controller: Navigation
});
