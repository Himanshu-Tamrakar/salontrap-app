import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import template from './salonsList.html';
import {
  Shops
} from '../../../api/shops'
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

    this.helpers({
      allShops() {
        return Shops.find({
          'location._id': $stateParams.locationId,
          'services': {
            $elemMatch: {
              _id: $stateParams.serviceId
            }
          }
        })
      }
    });
  }
}

const name = 'salonsList';

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
