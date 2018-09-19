(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex6', {
            templateUrl: 'views/ex6.html',
            controller: 'ex6Controller'
        });
    }]);


    app.controller('ex6Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex6';
        $rootScope.currentTitle = 'Update chart data from scope';        

        let getRandomNumber = function () {
            var max = 290, min = 30;
            return Math.round(((max - min) * Math.random()) + min);
        }


        $scope.dataSource = {
            "chart": {
              "caption": "Countries With Most Oil Reserves [2017-18]",
              "subCaption": "In MMbbl = One Million barrels",
              "xAxisName": "Country",
              "yAxisName": "Reserves (MMbbl)",
              "numberSuffix": "K",
              "theme": "fusion",
              "updateAnimDuration":"0.3"
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

        $scope.updateMyChartData = function () {
            //This function generates random number to update the chart data.
            $scope.dataSource.data[2].value = getRandomNumber();
            //This function generates random number to update the chart data.
            $scope.dataSource.data[3].value = getRandomNumber();
        };
    });
}());
    