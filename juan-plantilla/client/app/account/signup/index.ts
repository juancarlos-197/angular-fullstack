'use strict';
const angular = require('angular');
import SignupController from './signup.controller';

export default angular.module('plantillaApp.signup', [])
    .controller('SignupController', SignupController)
    .name;
