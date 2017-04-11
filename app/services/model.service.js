(function () {
    'use strict';

    angular.module('app')
        .value('model', {
            "user": "Andrei",
            "userPhoto": "images/AU.jpg"
        });

    angular.module('app')
        .value('sortType', 'action')
        .value('sortReverse', false);

})();