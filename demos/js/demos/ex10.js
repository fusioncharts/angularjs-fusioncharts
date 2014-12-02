(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex10', {
            templateUrl: 'views/ex10.html',
            controller: 'ex10Controller'
        });
    }]);

    app.controller('ex10Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex10';
    });
}());
    