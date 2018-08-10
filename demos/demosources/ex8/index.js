(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex8', {
            templateUrl: 'views/ex8.html',
            controller: 'ex8Controller'
        });
    }]);


    app.controller('ex8Controller', function ($scope, $rootScope) {
        var chart;
        $rootScope.demoId = 'ex8';
        $rootScope.currentTitle = 'Update chart attribute from scope';        

        $scope.dataSource = {
            "chart": {
              "caption": "Countries With Most Oil Reserves [2017-18]",
              "subCaption": "In MMbbl = One Million barrels",
              "xAxisName": "Country",
              "yAxisName": "Reserves (MMbbl)",
              "numberSuffix": "K",
              "theme": "fusion"
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
        
        $scope.initialized = function(chartObj){
           chart = chartObj;
        }

        $scope.changeBackgroundColor = function () {
            $scope.dataSource.chart.bgColor = '#efefef';
        };

        $scope.changeCaptionTextAlignment = function () {
            $scope.dataSource.chart.captionAlignment = 'left';
        };
    });
        
}());