var godOfCricketApp = angular.module('godOfCricket', ['ngRoute']);

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