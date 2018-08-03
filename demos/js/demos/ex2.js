(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex2', {
            templateUrl: 'views/ex2.html',
            controller: 'ex2Controller'
        });
    }]);


    app.controller('ex2Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex2';
        $rootScope.currentTitle = 'A 3D Pie Chart';
        $scope.myDataSource = {
            "chart": {
              "caption": "Recommended Portfolio Split",
              "subCaption" : "For a net-worth of $1M",
              "showValues":"1",
              "showPercentInTooltip" : "0",
              "numberPrefix" : "$",
              "enableMultiSlicing":"1",
              "theme": "fusion"
            },
            "data": [{
              "label": "Equity",
              "value": "300000"
            }, {
              "label": "Debt",
              "value": "230000"
            }, {
              "label": "Bullion",
              "value": "180000"
            }, {
              "label": "Real-estate",
              "value": "270000"
            }, {
              "label": "Insurance",
              "value": "20000"
            }]
        };
    });
        
}());
    