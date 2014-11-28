(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex6', {
            templateUrl: 'views/ex6.html',
            controller: 'ex6Controller'
        });
    }]);


    app.controller('ex6Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex6';

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

        $scope.updateMyChartData = function () {
            $scope.dataSource.data[2].label = "This Label is Updated";
            $scope.dataSource.data[2].value = "420000";

            $scope.dataSource.data[3].label = "This is updated as well";
            $scope.dataSource.data[3].value = "210000";
        };
    });
}());
    