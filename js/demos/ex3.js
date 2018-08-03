(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex3', {
            templateUrl: 'views/ex3.html',
            controller: 'ex3Controller'
        });
    }]);


    app.controller('ex3Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex3';
        $rootScope.currentTitle = 'A Column, Line and Area Combi Chart';
        $scope.dataSource =  {
            "chart": {
                "caption": "Expense Analysis",
                "subCaption": "ACME Inc.",
                "xAxisname": "Region",
                "yAxisName": "Amount (In USD)",
                "numberPrefix": "$",
                "exportenabled": "1",
                "theme": "fusion"
            },
            "categories": [
                {
                    "category": [
                        { "label": "East" },
                        { "label": "West" },
                        { "label": "South" },
                        { "label": "North" }
                    ]
                }
            ],
            "dataset": [
                {
                    "seriesName": "Actual Expenses",
                    "data": [
                        { "value": "1441290" },
                        { "value": "855912" },
                        { "value": "911404" },
                        { "value": "648136" }
                    ]
                },
                {
                    "seriesName": "Budgeted Expenses",
                    "renderAs": "line",
                    "data": [
                        { "value": "1297430" },
                        { "value": "776485" },
                        { "value": "685352" },
                        { "value": "726791" }
                    ]
                },
                {
                    "seriesName": "Unknown liabilities",
                    "renderAs": "area",
                    "showAnchors" : "0",
                    "data": [
                        { "value": "143860" },
                        { "value": "79427" },
                        { "value": "226052" },
                        { "value": "78655" }
                    ]
                }
            ]
        };
    });
        
}());
    