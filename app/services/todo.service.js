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
            isItemValid,
            warningLevel,
            removeItem
        };

        function addNewItem(items, newItem) {
            if (isItemValid(newItem)) {
                items.push({
                   action: newItem.action,
                   done: false,
                   deadline: newItem.deadline,
                   responsible: newItem.responsible,
                   estimation: newItem.estimation
                });

                newItem.action = '';
                newItem.deadline = '';
                newItem.responsible = '';
                newItem.estimation = '';
            }
        }

        function getItems() {
            return $http
                .get('data/todo.json')
                .then(response => response.data)
                .catch(() => $q.reject('Error'));
        }

        function removeItem(items, item) {
            //console.log(`items: ${items}`);
            //console.log(`item: ${item}`);
            //console.log(item);
            //console.log(items);
            //var temp = items.filter(value => value !== item);
            //console.log(temp);
            //items = temp;
            
            //var index = array.indexOf(item);
            //console.log(index);
            //delete items[index];

            var index = items.findIndex(x => x == item);
            console.log(index);
            items.splice(index, 1);
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

        function isItemValid(newItem) {
            return newItem 
                && newItem.action 
                && angular.isDate(newItem.deadline)
                && newItem.responsible 
                && angular.isNumber(newItem.estimation);
        }

        function warningLevel(items) {
            return incompleteCount(items) < 3
                ? 'label-success'
                : 'label-warning';
        }
    }

})();