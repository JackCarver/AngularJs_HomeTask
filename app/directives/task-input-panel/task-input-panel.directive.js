(function () {
    'use strict';

    angular.module('app')
        .directive('taskInputPanel', taskInputPanel);

    function taskInputPanel() {
        const directive = {
            restrict: 'E',
            controller: "TaskInputPanel",
            controllerAs: "$ctrl",
            scope: {},
            templateUrl: 'directives/task-input-panel/task-input-panel.directive.html'            
        };

        return directive;
    }

})();