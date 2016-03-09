
// routes
app.config(function ($routeProvider) {
    $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'homeCtrl'
            })
            .otherwise({
                templateUrl: 'views/other.html',
                controller: 'AlertDemoCtrl'
            });
});
