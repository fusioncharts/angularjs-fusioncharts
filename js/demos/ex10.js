(function () {
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when ('/demos/ex10', {
            templateUrl: 'views/ex10.html',
            controller: 'ex10Controller'
        });
    }]);

    
            globalContainer = {};

    app.controller('ex10Controller', function ($scope, $rootScope) {
        $rootScope.demoId = 'ex10';
        $rootScope.currentTitle = 'Percentage Calculation';        

        var vm = this;
        $scope.total = 0;

        $scope.logMessage = 'Click on the  plot to see the percentage of a column wrt total';

        // Save the function reference in global object so that FusionCharts link can call 
        // it when called
        $scope.log = function(label, value){ 
            // Since the update is happening outside angular execution context we need 
            // the digest cycle to run to make sure that the view is updated.   
            $scope.$apply(function(){
                $scope.logMessage = `${label} is ${value}% of the total`;                 
            });
        }
        
        var DataSource = {
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

        var myData=DataSource.data,total=0;
        for(var i=0;i<myData.length;i++)
        {
            total+=Number(myData[i].value);
        }
        $scope.total = total;

        $scope.events = {
            dataplotclick: function(e,a){
                var ratio=(parseFloat(a.dataValue/$scope.total)*100).toFixed(2);
                $scope.log(a.categoryLabel, ratio);
            }
        }
        
        $scope.myDataSource=DataSource;
    
    });
    
}());
    