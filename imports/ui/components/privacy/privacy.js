import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import template from './privacy.html';
import ngMaterial from 'angular-material';

class Privacy {
  constructor($log, $scope, $reactive, $timeout, $state) {
    'ngInject';

    $reactive(this).attach($scope);
    window.scrollTo(0, 0);
    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

  }


}


const name = 'privacy';
// const template = Meteor.Device.isPhone() ? mobileTemplate : webTemplate;

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  // SalonsList
]).component(name, {
  template,
  controllerAs: name,
  controller: Privacy
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('privacy', {
    url: '/privacy',
    template: '<privacy></privacy>'
  });
}
