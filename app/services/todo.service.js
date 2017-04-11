(function () {
    'use strict';

    angular.module('app')
        .factory('todoService', todoService);

    todoService.$inject = ['$http', '$q'];
    function todoService($http, $q) {
        return {
            addNewItem,
            getItems,
            incompleteCount,
            warningLevel,
            removeItem,
            removeCompletedItem,
            isHaveIncompleteItem,
            checkStatus,
            missedDeadline,
            changeItem
        };

        function changeItem(items, newItem, oldItem) {
            removeItem(items, oldItem);
            items.push(newItem);
        }

        function addNewItem(items, newItem) {
            items.push(newItem);
        }

        function getItems() {
            return $http
                .get('data/todo.json')
                .then(response => response.data)
                .catch(() => $q.reject('Error'));
        }

        function removeItem(items, item) {
            var index = items.findIndex(fItem => fItem == item);
            items.splice(index, 1);
        }

        function removeCompletedItem(items) {
             for (var i = 0; i < items.length; i++) {
                 console.log(items[i]);
                 if (items[i].done) {
                     items.splice(i,1);
                     i--;
                 }
             }                
        }

        function incompleteCount(items) {
            let count = 0;

            angular.forEach(items, (item) => {
                if (!item.done) {
                    count++
                }
            });

            return count;
        }

        function isHaveIncompleteItem(items) {
           let isHave = false;
            if(items != undefined) {    // todo: may be we can remove it, but we will have error after page loaded
                var count = items.length - incompleteCount(items);
                isHave = count > 0;
            }

            return isHave;            
        }

        function warningLevel(items) {
            return incompleteCount(items) < 3
                ? 'label-success'
                : 'label-warning';
        }

        function missedDeadline(item) {
            return new Date(item.deadline) < new Date() && !item.done
                ? {"background": "orange"}
                : {};
        }

        function checkStatus(items, isCheckAll) {
            angular.forEach(items, function(item) {
                item.done = isCheckAll;
            });
        }
    }

})();