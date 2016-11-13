questionApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/enterName', {
            templateUrl: 'view/landingPage.template.html',
            controller: 'landingPageController'
        })
        .when('/', {
            templateUrl: 'view/landingPage.template.html',
            controller: 'landingPageController'
        })
        .otherwise("/", {
            url: '/enterName'
        })
}]);
