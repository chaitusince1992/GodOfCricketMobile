godOfCricketApp.controller('homeController', ['$scope', '$rootScope', '$location', 'commonServices',
    function ($scope, $rootScope, $location, commonServices) {
        console.log('inside homeController');
        $scope.init = function () {
        };
        $scope.submitButtonNextPage = function() {
            console.log("go to next page");
//            $location.path("questions/1");            
        };
    }
]);
