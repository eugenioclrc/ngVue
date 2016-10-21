import * as angular from 'angular';
import Vue from 'vue';
import App from './App';

angular.module('testapp', [])
.directive('vueEl', () => ({
  restrict: 'A',
  link: (scope, el) => {
    /* eslint-disable no-new */
    new Vue({
      el: el[0],
      template: '<App/>',
      components: { App },
    });
  },
}));
