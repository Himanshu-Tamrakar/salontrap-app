import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import webTemplate from './home.html';
import mobileTemplate from './home.mobile.html';
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
import {
  name as SalonDetails
} from '../salonDetails/salonDetails'
import {
  Shops
} from '../../../api/shops'

class Home {
  constructor($scope, $reactive, $timeout, $state) {
    'ngInject';

    $reactive(this).attach($scope);
    window.scrollTo(0, 0);
    this.scope = $scope;
    this.timeout = $timeout;
    this.state = $state;

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

    $scope.howItsWork = [{
      'image': 'search',
      'content': 'Select Beauty Service'
    }, {
      'image': 'done_all',
      'content': 'Choose Beauty Professional'
    }, {
      'image': 'access_time',
      'content': 'Select Date And Time'
    }, {
      'image': 'settings',
      'content': 'Book An Appointment And Relax'
    }]

    $scope.colorRow = function(index) {
      $scope.row = index;
    }

    $timeout(function() {
      //Slider initializer
      if (Meteor.Device.isPhone()) {
        $(document).ready(function() {
          $('.slider').slider({
            'height': 200
          });
        });
      } else {
        $(document).ready(function() {
          $('.slider').slider({});
        });
      }

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
    } else if (this.selected.salonLocation == null) {
      Materialize.toast('Pease Select The Location', 5000);
    }
  }

  homeSubmit() {
    $state = this.state;

    const shop = Shops.findOne({
      'isHomeSalon': true
    })

    if (shop && this.selected.homeService) {
      const salonId = shop._id
      const serviceId = shop.serviceId
      $state.go('salonDetails', {
        'salonId': salonId,
        'serviceId': serviceId
      })
    } else if(!this.selected.homeService){
      Materialize.toast('Please Select Some Services', 5000);
    } else {
      Materialize.toast('Could not find any Home delivery services', 5000);
    }

  }

}


const name = 'home';
const template = Meteor.Device.isPhone() ? mobileTemplate : webTemplate;

export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ngMaterial,
  SalonsList,
  SalonDetails
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
