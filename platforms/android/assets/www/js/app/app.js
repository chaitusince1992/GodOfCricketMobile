var godOfCricketApp = angular.module('godOfCricket', ['ngRoute','ngAnimate']);

godOfCricketApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'view/home.template.html',
            controller: 'homeController'
        })
        /*.when('/questions/:questionNo', {
            templateUrl: 'view/questions.template.html',
            controller: 'questionsController'
        })*/
        .otherwise("/home", {
            url: '/home'
        })
}]);
