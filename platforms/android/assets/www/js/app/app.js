var godOfCricketApp = angular.module('godOfCricket', ['ngRoute', 'ngAnimate', 'highcharts-ng']);

godOfCricketApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'view/home.template.html',
            controller: 'homeController'
        })
        .when('/summary', {
            templateUrl: 'view/summary.template.html',
            controller: 'summaryController'
        })
        .when('/charts/:chartName', {
            templateUrl: 'view/charts.template.html',
            controller: 'chartsController'
        })
        .otherwise("/home", {
            url: '/home'
        })
}]);

godOfCricketApp.directive('hcChart', function() {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function(scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
    };
});
godOfCricketApp.directive('hcPieChart', function() {
    return {
        restrict: 'EA',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '=',
            drilldown: '='
        },
        link: function(scope, element) {
            Highcharts.chart(element[0], {
                chart: {
                    type: 'column'
                },
                title: {
                    text: scope.title
                },
                series: scope.data,
                drilldown: scope.drilldown,
            activeAxisLabelStyle: {
                textDecoration: 'none',
                fontStyle: 'italic'
            },
            activeDataLabelStyle: {
                textDecoration: 'none',
                fontStyle: 'italic'
            },
            });
        }
    };
})