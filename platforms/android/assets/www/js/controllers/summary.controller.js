godOfCricketApp.controller('summaryController', ['$scope', '$rootScope', '$location', 'commonServices',
    function ($scope, $rootScope, $location, commonServices) {
        console.log('inside homeController');
        $scope.init = function () {
            commonServices.getSachinDataFromCSV(function (result) {
                console.log(result);
                resultOverView = commonServices.cleanData(result);
                $scope.totalScore = resultOverView.totalScore;
                $scope.battingAverage = Math.floor(resultOverView.battingAverage*100)/100;
                $scope.halfCenturies = resultOverView.halfCenturies;
                $scope.centuries = resultOverView.centuries;
            });
        };
        $scope.goBack = function () {
            console.log("go to previous page");
            history.back();
        };
        $scope.clickedOnTotalScores = function() {
            console.log("clicked on total scores");
            $location.path("/charts/line");
        };
    }
]);
