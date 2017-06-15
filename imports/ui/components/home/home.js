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
import {
  name as SalonsList
} from '../salonsList/salonsList'

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
      'image': "https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/cards/1/171/20170529-190556-5091.jpeg",
      "heading3": "This is our big Tagline!",
      "hearding5": "Here's our small slogan."
    }, {
      'image': "https://d3p959fz8jdi04.cloudfront.net/suggestadoc/images/gallery/cards/1/171/20170529-190556-277.jpeg",
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

      // select initializer
      $(document).ready(function() {
        $('select').material_select();
      });

    }, 100);

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
      Materialize.toast('Pease Select The Service', 5000);
      console.log("serviceId Not avail");
    } else if (this.selected.salonLocation == null) {
      Materialize.toast('Pease Select The Location', 5000);
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
  SalonsList
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
