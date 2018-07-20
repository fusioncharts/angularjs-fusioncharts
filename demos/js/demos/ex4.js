(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex4', {
            templateUrl: 'views/ex4.html',
            controller: 'ex4Controller'
        });
    }]);


    app.controller('ex4Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex4';
        $scope.dataSource = {
            "chart": {
              "caption": "Countries With Most Oil Reserves [2017-18]",
              "subCaption": "In MMbbl = One Million barrels",
              "xAxisName": "Country",
              "yAxisName": "Reserves (MMbbl)",
              "numberSuffix": "K",
              "theme": "fusion",
            },
            "data": [
                { "label": "Venezuela", "value": "290" },
                { "label": "Saudi", "value": "260" },
                { "label": "Canada", "value": "180" },
                { "label": "Iran", "value": "140" },
                { "label": "Russia", "value": "115" },
                { "label": "UAE", "value": "100" },
                { "label": "US", "value": "30" },
                { "label": "China", "value": "30"}
            ]
        };
    });
        
}());
    