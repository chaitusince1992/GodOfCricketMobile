godOfCricketApp.controller('chartsController', ['$scope', '$rootScope', '$location', 'commonServices', '$routeParams',
    function($scope, $rootScope, $location, commonServices, $routeParams) {
        console.log('inside homeController');
        $scope.init = function() {
            $("#container").css("height", $("#container").height());
            $(window).resize(function() {
                $("#container").css("height","100%");
                $("#container").css("height", $("#container").height());
            });            
            commonServices.getSachinDataFromCSV(function(result) {
                //                console.log(result);
                var resultOverView = commonServices.cleanData(result);
//                if()
                console.log($routeParams.chartName);
                $("#go-to-next-chart").show();
                if($routeParams.chartName == 'score') {
                    $scope.scoringChart(resultOverView);
                    $scope.pageName = 'Runs';
                } else if($routeParams.chartName == 'average') {
                    $scope.averageChart(resultOverView);
                    $scope.pageName = 'Batting Average';
                } else if($routeParams.chartName == 'centuries') {
                    $scope.centuriesChart(resultOverView);
                    $scope.pageName = 'Centuries';
                } else if($routeParams.chartName == 'halfcenturies') {
                    $scope.halfCenturiesChart(resultOverView);
                    $scope.pageName = 'Half Centuries';
                    $("#go-to-next-chart").hide();
                }
            });
        };
        $scope.goBack = function() {
            console.log("go to previous page");
            history.back();
        };
        $scope.submitButtonNextPage = function() {
            if($routeParams.chartName == 'score') {
                $location.path("/charts/average");
            } else if($routeParams.chartName == 'average') {
                $location.path("/charts/centuries");
            } else if($routeParams.chartName == 'centuries') {
                $location.path("/charts/halfcenturies");
            }
        };
        $scope.scoringChart = function(resultOverView) {
            console.log(resultOverView);
            var temp = {};
            for (i = 0; i < resultOverView.cleanedData.length; i++) {
//                console.log(resultOverView.cleanedData[i].opposition);
                temp[resultOverView.cleanedData[i].opposition] = true;
            }
            var uniqueCountries = [];
            for (var k in temp) {
                console.log(k);
                uniqueCountries.push(k);
            }

            var scoreChartArray = [];
            for (var i = 0; i < uniqueCountries.length; i++) {
                scoreChartArray.push({
                    name: uniqueCountries[i],
                    y: 0
                });
            }
            for (var i = 0; i < scoreChartArray.length; i++) {
                for (var j = 0; j < resultOverView.cleanedData.length; j++) {
                    if (scoreChartArray[i].name == resultOverView.cleanedData[j].opposition) {
                        var score = scoreChartArray[i].y;
                        scoreChartArray[i].y = resultOverView.cleanedData[j].batting_score + score;
                    }
                }
            }
            console.log(scoreChartArray);
            var seriesData = [{
                name: 'Runs',
                colorByPoint: true,
                data: scoreChartArray
            }];
            var drillDownData = {
                series: [{
                    name: 'Microsoft Internet Explorer',
                    id: 'Microsoft Internet Explorer',
                    data: [
                        [
                            'v11.0',
                            24.13
                        ],
                        [
                            'v8.0',
                            17.2
                        ],
                        [
                            'v9.0',
                            8.11
                        ],
                        [
                            'v10.0',
                            5.33
                        ],
                        [
                            'v6.0',
                            1.06
                        ],
                        [
                            'v7.0',
                            0.5
                        ]
                    ]
                }]
            };
            commonServices.createChart($("#container"), '', '', seriesData, drillDownData);
        };
        $scope.averageChart = function(resultOverView) {
            console.log(resultOverView);
            var temp = {};
            for (i = 0; i < resultOverView.cleanedData.length; i++) {
//                console.log(resultOverView.cleanedData[i].opposition);
                temp[resultOverView.cleanedData[i].opposition] = true;
            }
            var uniqueCountries = [];
            for (var k in temp) {
                console.log(k);
                uniqueCountries.push(k);
            }

            var scoreChartArray = [];
            for (var i = 0; i < uniqueCountries.length; i++) {
                scoreChartArray.push({
                    name: uniqueCountries[i],
                    y: 0,
                    score: 0
                });
            }
            for (var i = 0; i < scoreChartArray.length; i++) {
                for (var j = 0; j < resultOverView.cleanedData.length; j++) {
                    if (scoreChartArray[i].name == resultOverView.cleanedData[j].opposition) {
                        if(resultOverView.cleanedData[j].notoutFlag == false) {
                            var countOfOuts = scoreChartArray[i].y + 1;
                            scoreChartArray[i].y = countOfOuts;
                        }
                        var score = scoreChartArray[i].score;
                        scoreChartArray[i].score = resultOverView.cleanedData[j].batting_score + score;
                    }
                }
            }
            var tempArray = scoreChartArray;
            scoreChartArray = [];
            for (var i = 0; i < tempArray.length; i++) {
                scoreChartArray.push({
                    name: tempArray[i].name,
                    y: Math.floor(tempArray[i].score / tempArray[i].y)
                })
            }
            console.log(scoreChartArray);
            var seriesData = [{
                name: 'Average',
                colorByPoint: true,
                data: JSON.parse(JSON.stringify(scoreChartArray))
            }];
            var drillDownData = null;
            commonServices.createChart($("#container"), '', '', seriesData, drillDownData);
        };
        $scope.centuriesChart = function(resultOverView) {
            console.log(resultOverView);
            var temp = {};
            for (i = 0; i < resultOverView.cleanedData.length; i++) {
//                console.log(resultOverView.cleanedData[i].opposition);
                temp[resultOverView.cleanedData[i].opposition] = true;
            }
            var uniqueCountries = [];
            for (var k in temp) {
                console.log(k);
                uniqueCountries.push(k);
            }

            var scoreChartArray = [];
            for (var i = 0; i < uniqueCountries.length; i++) {
                scoreChartArray.push({
                    name: uniqueCountries[i],
                    y: 0,
                    score: 0
                });
            }
            for (var i = 0; i < scoreChartArray.length; i++) {
                for (var j = 0; j < resultOverView.cleanedData.length; j++) {
                    if (scoreChartArray[i].name == resultOverView.cleanedData[j].opposition) {
                        if(resultOverView.cleanedData[j].batting_score >= 100) {
                            var centuries = scoreChartArray[i].y + 1;
                            scoreChartArray[i].y = centuries;
                        }
                    }
                }
            }
            console.log(scoreChartArray);
            var seriesData = [{
                name: 'Centuries',
                colorByPoint: true,
                data: JSON.parse(JSON.stringify(scoreChartArray))
            }];
            var drillDownData = null;
            commonServices.createChart($("#container"), '', '', seriesData, drillDownData);
        };
        $scope.halfCenturiesChart = function(resultOverView) {
            console.log(resultOverView);
            var temp = {};
            for (i = 0; i < resultOverView.cleanedData.length; i++) {
//                console.log(resultOverView.cleanedData[i].opposition);
                temp[resultOverView.cleanedData[i].opposition] = true;
            }
            var uniqueCountries = [];
            for (var k in temp) {
                console.log(k);
                uniqueCountries.push(k);
            }

            var scoreChartArray = [];
            for (var i = 0; i < uniqueCountries.length; i++) {
                scoreChartArray.push({
                    name: uniqueCountries[i],
                    y: 0,
                    score: 0
                });
            }
            for (var i = 0; i < scoreChartArray.length; i++) {
                for (var j = 0; j < resultOverView.cleanedData.length; j++) {
                    if (scoreChartArray[i].name == resultOverView.cleanedData[j].opposition) {
                        if(resultOverView.cleanedData[j].batting_score >= 50 && resultOverView.cleanedData[j].batting_score < 100 ) {
                            var halfcenturies = scoreChartArray[i].y + 1;
                            scoreChartArray[i].y = halfcenturies;
                        }
                    }
                }
            }
            console.log(scoreChartArray);
            var seriesData = [{
                name: 'Half centuries',
                colorByPoint: true,
                data: JSON.parse(JSON.stringify(scoreChartArray))
            }];
            var drillDownData = null;
            commonServices.createChart($("#container"), '', '', seriesData, drillDownData);
        };
    }
]);