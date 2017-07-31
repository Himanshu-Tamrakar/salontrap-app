import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import ngSanitize from 'angular-sanitize';

import template from './privacyPolicy.html';

import {
    Meteor
} from 'meteor/meteor';

class PrivacyPolicy {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'privacyPolicy';

// Module Creation
export default angular.module(name, [
    angularMeteor,
    ngSanitize,
    uiRouter
]).component(name, {
    template,
    controllerAs: name,
    controller: PrivacyPolicy
})
