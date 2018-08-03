(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex5', {
            templateUrl: 'views/ex5.html',
            controller: 'ex5Controller'
        });
    }]);


    app.controller('ex5Controller', function ($scope, $rootScope) {
        $rootScope.currentTitle = 'Fetch data from a JSON URL';        
        $rootScope.demoId = 'ex5';
    });
        
}());
    