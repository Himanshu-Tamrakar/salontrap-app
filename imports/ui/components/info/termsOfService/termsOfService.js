import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';

import template from './termsOfService.html';

import {
    Meteor
} from 'meteor/meteor';

class TermsOfService {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'termsOfService';

// Module Creation
export default angular.module(name, [
    angularMeteor,
    ngSanitize,
    uiRouter
]).component(name, {
    template,
    controllerAs: name,
    controller: TermsOfService
});
