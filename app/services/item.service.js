(function () {
    'use strict';

    angular.module('app')
        .factory('itemService', itemService);

    function itemService() {
        return {
            getDefaultItem,
            validateItem,
            copyItem
        };

        function copyItem(itemNew) {
            return {
                "action":  itemNew.action,
                "done": itemNew.done,
                "deadline": new Date(itemNew.deadline),
                "responsible": itemNew.responsible,
                "estimation": itemNew.estimation
            };
        }

        function getDefaultItem() {
            return {
                "action": null,
                "done": false,
                "deadline": null,
                "responsible": null,
                "estimation": null
            }; 
        }

        function validateItem(item) {
            return item 
                && item.action 
                && angular.isDate(item.deadline)
                && item.responsible 
                && angular.isNumber(item.estimation);
        }  
    }
})();