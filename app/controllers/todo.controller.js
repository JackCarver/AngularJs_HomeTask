(function () {
    'use strict';

    angular.module('app')
        .controller('Todo', Todo);

    Todo.$inject = ['model', 'todoService', '$mdDialog'];
    function Todo(model, todoService, $mdDialog) {
        let $ctrl = this;

        $ctrl.todo = model;
        $ctrl.myName = 'Andrei';
        $ctrl.myHTML = '<span>Andrei</span>';
        $ctrl.showComplete = true;

        $ctrl.addTask = function(ev) {
            $mdDialog.show({
                controller: "TaskInputPanel",
                controllerAs: "$ctrl",
                templateUrl: 'directives/task-input-panel/task-input-panel.directive.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    buttonEnterName: "Add",
                    isEditMode: false
                 }
            })
            .then(successAddDialog, rejectDialog);

            function successAddDialog(newItem) {
                todoService.addNewItem($ctrl.todo.items, newItem);
            }

            function rejectDialog() {
                console.log("dialog closed");
            }
        };

        $ctrl.editTask = function(ev, item) {
            $mdDialog.show({
                controller: "TaskInputPanel",
                controllerAs: "$ctrl",
                templateUrl: 'directives/task-input-panel/task-input-panel.directive.html',
                locals: {
                     isEditMode: true,
                     buttonEnterName: "Save",
                     item: item
                 },
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true                
            })
            .then(successEditDialog, rejectDialog);

            function successEditDialog(newItem) {
                todoService.changeItem($ctrl.todo.items, newItem, item);
            }

            function rejectDialog() {
                console.log("dialog closed");
            }
        };

        Object.assign($ctrl, todoService);
    }

})();