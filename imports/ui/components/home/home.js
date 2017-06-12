import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './home.html';
import uiRouter from '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import {
    Meteor
} from 'meteor/meteor';
import {
  Locations
} from '../../../api/locations';
import {
  Services
} from '../../../api/services';

class Home {
  constructor($log, $scope, $reactive, $timeout, $state, $q, $rootScope) {
    'ngInject';

    $reactive(this).attach($scope);

    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;
    this.rootScope = $rootScope;

    this.selected = {
      'salonService': null,
      'salonLocation': null,
      'homeService': null
    }

    $scope.sliderContent = [{
      'image': "http://lorempixel.com/580/250/nature/1",
      "heading3": "This is our big Tagline!",
      "hearding5": "Here's our small slogan."
    }, {
      'image': "http://lorempixel.com/580/250/nature/2",
      "heading3": "Left Aligned Caption",
      "hearding5": "Here's our small slogan."
    }, {
      'image': "http://lorempixel.com/580/250/nature/3",
      "heading3": "Right Aligned Caption",
      "hearding5": "Here's our small slogan."
    }, {
      'image': "http://lorempixel.com/580/250/nature/4",
      "heading3": "This is our big Tagline!",
      "hearding5": "Here's our small slogan."
    }]

    $timeout(function() {

      //Slider initializer
      $(document).ready(function() {
        $('.slider').slider();
      });
      // Tab initializer
      $(document).ready(function() {
        $('ul.tabs').tabs();
      });

      // Called everytime changing the tabs
      // $(document).ready(function() {
      //   $('ul.tabs').tabs({
      //     swipeable: true,
      //     responsiveThreshold: 1920
      //   });
      // });

      // select initializer
      $(document).ready(function() {
        $('select').material_select();
      });

    }, 100);

    $scope.atNgRepeatFinish = function() {
      $(document).ready(function() {
        $('ul.tabs').tabs();
        $('select').material_select();
      });
    }

    this.helpers({
      services() {
        return Services.find({});
      },
      locations() {
        return Locations.find({});
      }
    });
  }

  salonSubmit() {
    $state = this.state;

    const object = {
      serviceId: this.selected.salonService,
      locationId: this.selected.salonLocation
    }

    if ((this.selected.salonService != null) && (this.selected.salonLocation != null)) {
      $state.go('salons', object)
    } else if (this.selected.salonService == null) {
      console.log("serviceId Not avail");
    } else if (this.selected.salonLocation == null) {
      console.log("locationId Not avail");
    }
  }

  homeSubmit() {
    console.log(this.selected.homeService);
  }

}


const name = 'home';

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
]).component(name, {
  template,
  controllerAs: name,
  controller: Home
}).config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('home', {
    url: '/home',
    template: '<home></home>'
  });
}
