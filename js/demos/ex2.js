(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex2', {
            templateUrl: 'views/ex2.html',
            controller: 'ex2Controller'
        });
    }]);


    app.controller('ex2Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex2';
        $scope.myDataSource = {
            chart: {
                caption: "Age profile of website visitors",
                subcaption: "Last Year",
                startingangle: "120",
                showlabels: "0",
                showlegend: "1",
                enablemultislicing: "0",
                slicingdistance: "15",
                showpercentvalues: "1",
                showpercentintooltip: "0",
                plottooltext: "Age group : $label Total visit : $datavalue",
                theme: "ocean"
            },
            data: [
                {
                    label: "Teenage",
                    value: "1250400"
                },
                {
                    label: "Adult",
                    value: "1463300"
                },
                {
                    label: "Mid-age",
                    value: "1050700"
                },
                {
                    label: "Senior",
                    value: "491000"
                }
            ]
        }
    });
        
}());
    