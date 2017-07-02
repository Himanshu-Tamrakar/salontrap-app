import angular from 'angular';
import angularMeteor from 'angular-meteor';
import webTemplate from './salonDetails.html';
import mobileTemplate from './salonDetails.mobile.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
  Shops
} from '../../../api/shops'
import {
  Locations
} from '../../../api/locations'
import {
  Services
} from '../../../api/services'
import {
  ShopServices
} from '../../../api/shopServices'
import {
  name as Checkout
} from '../checkout/checkout'

class SalonDetails {
  constructor($stateParams, $scope, $reactive, $timeout, $state, $q, $rootScope) {
    'ngInject';

    $reactive(this).attach($scope);
    window.scrollTo(0, 0);

    this.stateParams = $stateParams;
    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;
    this.rootScope = $rootScope;
    this.timeout = $timeout;

    $scope.selectedItems = [];
    $scope.getReactively('selectedItems');

    //Temp veriable to initiate ng-change
    $scope.test = "";

    $scope.onCheckboxClicked = function() {
      $scope.selectedItems = []
      $("input:checkbox[name='subservice']:checked").each(function() {
        const item = JSON.parse($(this).val());
        $scope.selectedItems.push(item)
      })
    }

    $scope.locationIdToLocation = function(id) {
      if(id) {
        return Locations.findOne({'_id':id})
      }
    }

    $scope.serviceIdToService = function(id) {
      if(id) {
        return Services.findOne({'_id':id})
      }
    }

    $scope.filterServices = function(serviceId, services) {
      var result = services.filter(function(obj) {
        return obj.serviceId == serviceId;
      });
      return result
    }

    $scope.atNgRepeatFinish = function() {
      $(document).ready(function() {
        $('.collapsible').collapsible();
      });
    }

    $scope.atNgRepeatFinishForCarosel = function() {
      $(document).ready(function() {
        $('.carousel.carousel-slider').carousel({fullWidth: true});
      });

    }

    $timeout(function() {
      $(document).ready(function() {
        $('.carousel.carousel-slider').carousel({fullWidth: true});
      });

      $(document).ready(function() {
        $('.collapsible').collapsible();
      });
    }, 100);

    this.helpers({
      salonAllDetails() {
        var salonAllDetails = [];

        const shop = Shops.findOne({
          '_id': $stateParams.salonId
        })
        const service = ShopServices.findOne({
          '_id': $stateParams.serviceId
        })

        if (shop && service) {
          salonAllDetails.push({
            'shop': shop,
            'services': service
          })
        }

        return salonAllDetails;
      }
    });
  }

  checkout() {
    $scope = this.scope
    $state = this.state;
    $stateParams = this.stateParams
    if($scope.selectedItems.length > 0) {
      $state.go('checkout', {
        'selectedItemsObject': $scope.selectedItems,
        'salonId': $stateParams.salonId,
        'serviceId': $stateParams.serviceId
      })
    } else {
      Materialize.toast('Select Atleast One Service', 4000)
    }

  }
}

const name = 'salonDetails';
const template = Meteor.Device.isPhone() ? mobileTemplate : webTemplate;

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Checkout,
  ngMaterial
]).component(name, {
  template,
  controllerAs: name,
  controller: SalonDetails
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('salonDetails', {
      url: '/salon/:salonId/:serviceId/all',
      template: '<salon-details></salon-details>'
    });
}
