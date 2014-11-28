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
    });
        
}());
    