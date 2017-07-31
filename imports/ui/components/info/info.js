import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';

import template from './info.html';

import {
    Meteor
} from 'meteor/meteor';
import {
    name as About
} from './about/about';
import {
    name as CommunityGuidelines
} from './communityGuidelines/communityGuidelines';
import {
    name as PrivacyPolicy
} from './privacyPolicy/privacyPolicy';
import {
    name as TermsOfService
} from './termsOfService/termsOfService';

class Info {
    constructor($scope, $reactive, $timeout) {
        'ngInject';
        $reactive(this).attach($scope);

        document.title = "About | SalonTrap";

        $scope.pushpinReady = function() {
            $('.scrollspy').scrollSpy({
                scrollOffset: 50
            });
            $('#options').pushpin('remove');
        };
    }
}

const name = 'info';

// Module Creation
export default angular.module(name, [
    angularMeteor,
    ngSanitize,
    uiRouter,
    About,
    CommunityGuidelines,
    PrivacyPolicy,
    TermsOfService
]).component(name, {
    template,
    controllerAs: name,
    controller: Info
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('info', {
        url: '/privacy',
        template: '<info></info>'
    });
}
