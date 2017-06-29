import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import template from './salontrap.html';
import uiRouter from '@uirouter/angularjs';
import {
    Meteor
} from 'meteor/meteor';
import {
  name as Navigation
} from '../navigation/navigation';
import {
  name as Home
} from '../home/home';
import {
  name as Privacy
} from '../privacy/privacy'
import {
  name as About
} from '../about/about'
/*
<HOME TO SALONS>
1. Things To Change in Future
Use
ui-sref="salons({ serviceId: 's', locationId: 's'})"
at home Submib

2. Make Auto complete instead of select in Home

3. make url /salons by adding params in .component
*/
class SalonTrap {
  constructor($scope, $reactive, $rootScope, $timeout, $state, $interval) {

    'ngInject';
    $reactive(this).attach($scope);

    this.state = $state;
    this.timeout = $timeout;
    this.scope = $scope;
    this.rootScope = $rootScope;
  }
}
const name = 'salontrap';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  Navigation,
  Home,
  Privacy,
  About
]).component(name, {
  template,
  controllerAs: name,
  controller: SalonTrap
}).config(config);

function config($locationProvider, $urlRouterProvider, $stateProvider) {
  'ngInject';

  $stateProvider.state('salontrap', {
      abstract: true,
      template: '<salontrap></salontrap>'
  });

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/home');
}
