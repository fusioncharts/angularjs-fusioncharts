(function () {
    window.app = angular.module ('fusioncharts-demo', ['ngRoute', 'ng-fusioncharts', 'ui.bootstrap', 'ui.bootstrap.tpls']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise ('/demos/ex1');
    }]);
    app.controller('DemoController', function ($scope, $routeParams, $rootScope) {
        setTimeout(function () {
            $rootScope.$watch('demoId', function (newVal) {
                $scope.html = window.fcDemos[newVal].html;
                $scope.js = window.fcDemos[newVal].js;
                setTimeout(function () {
                    Prism.highlightAll ();
                });
            });
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