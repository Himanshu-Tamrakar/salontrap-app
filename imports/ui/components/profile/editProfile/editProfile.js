import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './editProfile.html';
import uiRouter from '@uirouter/angularjs';
import {
  Meteor
} from 'meteor/meteor';

class EditProfile {
  constructor($scope, $reactive, $timeout, $state) {
    'ngInject';
    $reactive(this).attach($scope);

    this.userProfile = {
      'name': null,
      'email': null,
      'phoneNumber':null,
      'dob': null,
      'address': null
    }

    $timeout(function () {
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });
    }, 10);

    this.helpers({
      updateValue() {
        const user = Meteor.users.findOne(Meteor.userId());
        if(user) {
          if(user.profile.name) {
            this.userProfile.name = user.profile.name;
          }
          if(user.profile.email) {
            this.userProfile.email = user.profile.email;
          }
          if(user.profile.phoneNumber) {
            this.userProfile.phoneNumber = user.profile.phoneNumber;
          }
          if(user.profile.dob) {
            this.userProfile.dob = user.profile.dob;
          }
          if(user.profile.address) {
            this.userProfile.address = user.profile.address;
          }
        }

      }
    })
  }

  update() {
    Meteor.call('updateProfile', this.userProfile)
  }

}

const name = 'editProfile';

export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: EditProfile
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('editProfile', {
      url: '/editProfile',
      template: '<edit-profile></edit-profile>'
    });
}
