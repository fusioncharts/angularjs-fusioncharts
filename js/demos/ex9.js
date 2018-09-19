(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/demos/ex9', {
            templateUrl: 'views/ex9.html',
            controller: 'ex9Controller'
        });
    }]);


    app.controller('ex9Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex9';
        $rootScope.currentTitle = 'Separate objects for attributes';        
        // the chart object in datasource
        $scope.attrs = {
            "caption": "Twitter Mentions",
            "yAxisName": "Number of mentions",
            "subCaption": "(iPhone Vs Samsung)",
            "numbersuffix": "M",
            "yAxisMaxValue": "2",
            "plottooltext": "$seriesName was mentioned <b>$dataValue</b> times on Twitter in $label",
            "theme": "fusion"
        };
       // the category object in datasource
        $scope.categories = [
            { 
                "category": 
                [
                    { "label": "2007" },
                    { "label": "2008" },
                    { "label": "2009" },
                    { "label": "2010" },
                    { "label": "2011" },
                    { "label": "2012" },
                    { "label": "2013" },
                    { "label": "2014" },
                    { "label": "2015" }
                ]
            }
        ]
        // the dataset object in  datasource
        $scope.dataset = [
            {
              "seriesname": "iPhone",
              "data": [
                { "value": "1.90" },
                { "value": "1.94" },
                { "value": "1.69" },
                { "value": "1.66" },
                { "value": "1.43" },
                { "value": "1.97" },
                { "value": "1.78" },
                { "value": "1.58" },
                { "value": "1.55" }
              ]
            },
            {
              "seriesname": "Samsung",
              "data": [
                { "value": "0.68" },
                { "value": "0.74" },
                { "value": "0.25" },
                { "value": "0.64" },
                { "value": "0.22" },
                { "value": "0.74" },
                { "value": "0.58" },
                { "value": "0.15" },
                { "value": "0.26" }
              ]
            }
        ];
    });

}());