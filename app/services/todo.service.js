(function () {
    'use strict';

    angular.module('app')
        .factory('todoService', todoService);

    todoService.$inject = ['$http', '$q', 'isEditModeOn'];
    function todoService($http, $q, isEditModeOn) {
        return {
            addNewItem,
            getItems,
            incompleteCount,
            isItemValid,
            warningLevel,
            removeItem,
            removeCompletedItem,
            isHaveIncompleteItem,
            checkStatus,
            setEditItem,
            SaveEditButtonName,
            missedDeadline
        };

        function SaveEditButtonName() {
            return isEditModeOn
                ? "Save"
                : "Add";
        }

        function addNewItem(items, newItem, tempEditItem) {
            if(isEditModeOn ) {
                removeItem(items, tempEditItem);
                isEditModeOn = false;
            }

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

        function setEditItem(item, $ctrl) {
            $ctrl.newItem = {
                    action: item.action,
                    done: false,
                    deadline: new Date(item.deadline),
                    responsible: item.responsible,
                    estimation: item.estimation
            };
            $ctrl.tempEditItem = item;
            isEditModeOn = true;
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

        function isItemValid(newItem) {
            return newItem 
                && newItem.action 
                && angular.isDate(newItem.deadline)
                && newItem.responsible 
                && angular.isNumber(newItem.estimation);
        }

        function isHaveIncompleteItem(items) {
            if(items != undefined) {    // todo: may be we can remove it, but we will have error after page loaded
                var count = items.length - incompleteCount(items);
                return count > 0;
            }

            return 0;            
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