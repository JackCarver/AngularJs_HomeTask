(function () {
    'use strict';

    angular.module('app')
        .directive('taskInputPanel', taskInputPanel);

    function taskInputPanel() {
        const directive = {
            restrict: 'E',
            templateUrl: 'directives/task-input-panel/task-input-panel.directive.html'
        };

        return directive;
    }

})();