(function () {
    window.app = angular.module('demo_browser', ['ngRoute', 'ng-fusioncharts', 'ui.bootstrap']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/:demoid', {
            templateUrl: 'demos/view.html',
            controller: 'DemoController'
        }).otherwise('/demos/ex01');
    }]);


    app.controller('DemoController', function ($scope, $routeParams) {
        $scope.demoid = $routeParams.demoid;
        $scope.demoname = fcDemos[$routeParams.demoid].name;
        $scope.demo = fcDemos[$routeParams.demoid];
        
        fcDemos[$scope.demoid].js_func($scope);
        setTimeout(function () {
            Prism.highlightAll ();    
        });
        
    });

    app.directive('ngPrism',['$interpolate', function ($interpolate) {
        "use strict";
        return {
          restrict: 'E',
          template: '<pre><code ng-transclude></code></pre>',
          replace:true,
          transclude:true,

        };
    }]);

}());