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
        var vm = this;

        $scope.logMessage = 'Click on the  plot to see the percentage of a column wrt total';

        // Save the function reference in global object so that FusionCharts link can call 
        // it when called
        globalContainer.log = vm.log = function(msg){ 
            // Since the update is happening outside angular execution context we need 
            // the digest cycle to run to make sure that the view is updated.   
            $scope.$apply(function(){
                $scope.logMessage = "Percentage is  "+msg+"% of the total";                 
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
        for(var i=0;i<myData.length;i++)
        {
            var ratio=(parseFloat(myData[i].value/total)*100).toFixed(2);
            var myString="Ratio is : "+ratio+" %";
            myData[i]["link"]="JavaScript:globalContainer.log("+ratio+");";
        }
        
        $scope.myDataSource=DataSource;
    
    });
    
}());
    