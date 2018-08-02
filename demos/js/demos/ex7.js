(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex7', {
            templateUrl: 'views/ex7.html',
            controller: 'ex7Controller'
        });
    }]);


    app.controller('ex7Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex7';
        $rootScope.currentTitle = 'Trigger scope event from chart';        


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

        $scope.events = {
            dataplotrollover: function (ev, props) {
                $scope.$apply(function () {
                    $scope.selectedValue = props.displayValue;
                    $scope.selectedLabel = props.categoryLabel;
                });
            }
        }
    });
        
}());