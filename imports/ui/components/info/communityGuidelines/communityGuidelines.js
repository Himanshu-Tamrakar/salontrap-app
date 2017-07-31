import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from '@uirouter/angularjs';
import ngSanitize from 'angular-sanitize';

import template from './communityGuidelines.html';

import {
    Meteor
} from 'meteor/meteor';

class CommunityGuidelines {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'communityGuidelines';

// Module Creation
export default angular.module(name, [
    angularMeteor,
    ngSanitize,
    uiRouter
]).component(name, {
    template,
    controllerAs: name,
    controller: CommunityGuidelines
})
