(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex8', {
            templateUrl: 'views/ex8.html',
            controller: 'ex8Controller'
        });
    }]);


    app.controller('ex8Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex8';

        $scope.dataSource = {
            chart: {
                caption: "Harry's SuperMart",
                subCaption: "Top 5 stores in last month by revenue",
                numberPrefix: "$",
                theme: "ocean"
            },
            data:[{
                label: "Bakersfield Central",
                value: "880000"
            },
            {
                label: "Garden Groove harbour",
                value: "730000"
            },
            {
                label: "Los Angeles Topanga",
                value: "590000"
            },
            {
                label: "Compton-Rancho Dom",
                value: "520000"
            },
            {
                label: "Daly City Serramonte",
                value: "330000"
            }]
        };

        $scope.changeBackgroundColor = function () {
            $scope.dataSource.chart.bgColor = "#efefef";
        };

        $scope.changeCaptionTextAlignment = function () {
            $scope.dataSource.chart.captionAlignment = "left";
        };
    });
        
}());