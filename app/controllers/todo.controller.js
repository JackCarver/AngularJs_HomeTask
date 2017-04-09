(function () {
    'use strict';

    angular.module('app')
        .controller('Todo', Todo);

    Todo.$inject = ['model', 'todoService'];
    function Todo(model, todoService) {
        let $ctrl = this;

        $ctrl.todo = model;
        $ctrl.myName = 'Vitaliy';
        $ctrl.myHTML = '<span>Vitaliy</span>';
        $ctrl.showComplete = true;

        // $ctrl.incompleteCount = todoService.incompleteCount;
        // $ctrl.warningLevel = todoService.warningLevel;
        Object.assign($ctrl, todoService);

        console.log($ctrl.todo);


    }

})();