import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './profile.html';
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
import {
  Services
} from '../../../api/services'
import {
  name as EditProfile
} from './editProfile/editProfile'

class Profile {
  constructor($scope, $reactive, $timeout, $state, $rootScope) {
    'ngInject';

    $reactive(this).attach($scope);

    $timeout(function() {
      $(document).ready(function() {
        $('ul.tabs').tabs();
      });

      $(document).ready(function() {
        $('.modal').modal();
      });
    }, 10);

    this.helpers({
      user() {
        if (Meteor.userId()) {
          return Meteor.users.findOne(Meteor.userId())
        }
      },
      bookings() {
        if (Meteor.userId()) {
          return Bookings.find({
            'userId': Meteor.userId(),
            'isCancel': false
          })
        }
      }
    });

    $scope.salonToSalonId = function(id) {
      return Shops.findOne({
        '_id': id
      })
    }
    $scope.serviceIdToService = function(id) {
      alert(id)
      return Services.findOne({
        '_id': id
      })
    }

  }

  cancelBooking(id) {
    if (id) {
      Meteor.call('cancelBooking', id, Meteor.userId());
    }
  }
}

const name = 'profile';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  EditProfile
]).component(name, {
  template,
  controllerAs: name,
  controller: Profile
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('profile', {
      url: '/profile',
      template: '<profile></profile>'
    });
}
