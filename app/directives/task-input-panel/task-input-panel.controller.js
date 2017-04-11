(function () {
    'use strict';

    angular.module('app')
        .controller('TaskInputPanel', TaskInputPanel);

    TaskInputPanel.$inject = ["$mdDialog", "itemService", "locals"];
    function TaskInputPanel($mdDialog, itemService, locals) {
        //console.log("started TaskInputPanel")
        let $ctrl = this;

        $ctrl.newItem = locals.isEditMode
            ? itemService.copyItem(locals.item)
            : itemService.getDefaultItem();

        $ctrl.buttonEnterName = locals.buttonEnterName;
        $ctrl.validateItem = itemService.validateItem;
        $ctrl.enter = enter; 
        $ctrl.close = close;

        function enter() {
            $mdDialog.hide($ctrl.newItem);
        }

        function close() {
            $mdDialog.cancel();
        }
    }  
})();