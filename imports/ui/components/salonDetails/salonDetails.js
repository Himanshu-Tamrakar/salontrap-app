import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './salonDetails.html';
import uiRouter from '@uirouter/angularjs';
import {
  Shops
} from '../../../api/shops'
import {
  ShopServices
} from '../../../api/shopServices'

class SalonDetails {
  constructor($stateParams, $scope, $reactive, $timeout, $state, $q, $rootScope) {
    'ngInject';

    $reactive(this).attach($scope);
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
        // const object = {
        //   'service': $(this).attr("data-valuetwo"),
        //   'subservice': item.name,
        //   'price': item.price,
        //   'discount': item.discount
        // }
        $scope.selectedItems.push(item)
      })
    }

    $scope.filterServices = function(serviceId, services) {
      var result = services.filter(function(obj) {
        return obj.serviceId == serviceId;
      });
      return result
    }

    // $scope.atNgRepeatFinish = function() {
    //   $(document).ready(function() {
    //     $('.carousel').carousel();
    //   });
    // }

    $timeout(function() {
      // $(document).ready(function() {
      //   $('.collapsible').collapsible();
      // });
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
    $state.go('checkout', {
      'selectedItemsObject': $scope.selectedItems,
      'salonId': $stateParams.salonId,
      'serviceId': $stateParams.serviceId
    })
  }
}

const name = 'salonDetails';

export default angular.module(name, [
  angularMeteor,
  uiRouter
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
