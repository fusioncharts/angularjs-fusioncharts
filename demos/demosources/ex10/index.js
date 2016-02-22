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
                    "caption": "Monthly revenue for last year",
                    "subCaption": "Harry's SuperMart",
                    "xAxisName": "Month",
                    "yAxisName": "Revenues (In USD)",
                    "numberPrefix": "$",
                    "paletteColors": "#0075c2",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "placevaluesInside": "1",
                    "rotatevalues": "1",
                    "valueFontColor": "#ffffff",                
                    "showXAxisLine": "1",
                    "xAxisLineColor": "#999999",
                    "divlineColor": "#999999",               
                    "divLineIsDashed": "1",
                    "showAlternateHGridColor": "0",
                    "subcaptionFontBold": "0",
                    "subcaptionFontSize": "14"
                },            
                "data": [
                    {
                        "label": "Jan",
                        "value": "420000"
                    }, 
                    {
                        "label": "Feb",
                        "value": "810000"
                    }, 
                    {
                        "label": "Mar",
                        "value": "720000"
                    }, 
                    {
                        "label": "Apr",
                        "value": "550000"
                    }, 
                    {
                        "label": "May",
                        "value": "910000"
                    }, 
                    {
                        "label": "Jun",
                        "value": "510000"
                    }, 
                    {
                        "label": "Jul",
                        "value": "680000"
                    }, 
                    {
                        "label": "Aug",
                        "value": "620000"
                    }, 
                    {
                        "label": "Sep",
                        "value": "610000"
                    }, 
                    {
                        "label": "Oct",
                        "value": "490000"
                    }, 
                    {
                        "label": "Nov",
                        "value": "900000"
                    }, 
                    {
                        "label": "Dec",
                        "value": "730000"
                    }
                ],
                "trendlines": [
                    {
                        "line": [
                            {
                                "startvalue": "700000",
                                "color": "#1aaf5d",
                                "valueOnRight": "1",
                                "displayvalue": "Monthly Target"
                            }
                        ]
                    }
                ]
            }

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
    