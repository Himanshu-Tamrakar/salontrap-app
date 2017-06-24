import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import webTemplate from './salonsList.html';
import mobileTemplate from './salonsList.mobile.html';
import {
  Shops
} from '../../../api/shops'
import {
  Locations
} from '../../../api/locations'
import {
  name as SalonDetails
} from '../salonDetails/salonDetails'

class SalonsList {
  constructor($scope, $reactive, $stateParams, $timeout) {
    'ngInject';
    $reactive(this).attach($scope);

    this.scope = $scope;
    this.stateParams = $stateParams;
    this.timeout = $timeout;

    $timeout(function () {
      $('.carousel.carousel-slider').carousel({fullWidth: true});

      $(document).ready(function() {
        $('ul.tabs').tabs();
      });
    }, 10);

    $scope.atNgRepeatFinish = function() {
      $('.carousel.carousel-slider').carousel({fullWidth: true});
    }

    this.helpers({
      allShops() {
        return Shops.find({
          'location._id': $stateParams.locationId,
          "services._id" : $stateParams.serviceId
          // 'services': {
          //   $elemMatch: {
          //     _id: $stateParams.serviceId
          //   }
          // }
        })
      }
    });

    $scope.locationIdToLocation = function(id) {
      if(id) {
        return Locations.findOne({'_id':id})
      }
    }
  }
}

const name = 'salonsList';
const template = Meteor.Device.isPhone() ? mobileTemplate : webTemplate;

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  SalonDetails
]).component(name, {
  template,
  controllerAs: name,
  // params: {
  //   serviceId: null,
  //   locationId: null
  // },
  controller: SalonsList,

}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('salons', {
      url: '/salons/:serviceId/:locationId/all',
      template: '<salons-list></salons-list>'
    });
}
