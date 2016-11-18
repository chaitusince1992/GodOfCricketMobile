godOfCricketApp.controller('chartsController', ['$scope', '$rootScope', '$location', 'commonServices',
    function($scope, $rootScope, $location, commonServices) {
        console.log('inside homeController');
        $scope.init = function() {
            commonServices.getSachinDataFromCSV(function(result) {
                //                console.log(result);
                var resultOverView = commonServices.cleanData(result);
                $scope.selectTypeOfChart(resultOverView);
            });
        };
        $scope.goBack = function() {
            console.log("go to previous page");
            history.back();
        };
        $scope.selectTypeOfChart = function(resultOverView) {
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
                name: 'Countries',
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
            commonServices.createChart($("#container"), 'Score Against Each country', '', seriesData, drillDownData);
        };

        $scope.chartConfig2 = {
            options: {
                //This is the Main Highcharts chart config. Any Highchart options are valid here.
                //will be overriden by values specified below.
                chart: {
                    type: 'column'
                },

                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            //The below properties are watched separately for changes.

            //Series object (optional) - a list of series using normal Highcharts series options.
            title: {
                text: 'Batting average versus each team'
            },
            loading: false,
            yAxis: {
                title: {
                    text: 'Batting Average'
                }
            },
            useHighStocks: false,
        };
    }
]);