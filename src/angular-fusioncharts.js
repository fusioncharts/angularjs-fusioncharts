(function () {
    var fc = angular.module('ng-fusioncharts', []);


    fc.directive('fcChart', function ($http) {
        return {
            scope: {
                fcWidth: '@',
                fcHeight: '@',
                fcDataset: '@',
                fcCategories: '@',
                fcChartAttrs: '@',
                fcChartClick: '@'
            },
            link: function (scope, element, attrs) {
                var chart = null,
                    events = {
                        chartClick: function (ev, props) {
                            if(attrs.fcChartClick) {
                                scope.$parent[attrs.fcChartClick](ev, props);    
                            }
                        }
                    };
                if(attrs.fcConfig) {
                    chart = new FusionCharts(scope[attrs.fcConfig]);
                    scope[attrs.fcChartObject] = chart;
                    chart.render ();
                } else if(attrs.fcJsonUrl) {
                    $http.get(attrs.fcJsonUrl)
                        .success(function (data) {
                            data.renderAt = element[0];
                            chart = new FusionCharts(data);
                            scope[attrs.fcChartObject] = chart;
                            chart.render ();
                        })
                        .error(function (err) {
                            throw err;
                        });
                } else {
                    var chartConfigObject = {
                        type: attrs.fcType,
                        width: attrs.fcWidth,
                        height: attrs.fcHeight,
                        renderAt: element[0],
                        dataFormat: attrs.fcDataFormat || 'json',
                        dataSource: {},
                        events: events
                    };
                    attrs.$observe('fcWidth', function (newVal) {
                        chart.resizeTo (scope.fcWidth, scope.fcHeight);
                    });
                    attrs.$observe('fcHeight', function (newVal) {
                        chart.resizeTo (scope.fcWidth, scope.fcHeight);
                    });

                    if(attrs.fcDatasource) {
                        chartConfigObject.dataSource = scope[attrs.fcDatasource];
                        attrs.$observe('fcDatasource', function (newVal) {
                            chart.setJSONData (JSON.parse(newVal));
                        }, true);
                    } else {
                        // chartConfigObject.dataSource.chart = scope[attrs.fcChartAttrs];
                        attrs.$observe('fcChartAttrs', function (newVal) {
                            setTimeout(function () {
                                chartConfigObject.dataSource.chart = JSON.parse(newVal);
                                chart.setJSONData (chartConfigObject.dataSource);
                            }, 0);
                        }, true)
                        if(attrs.fcData) {
                            // chartConfigObject.data = scope[attrs.fcData];
                            attrs.$observe('fcData', function (newVal) {
                                setTimeout(function () {
                                    chartConfigObject.dataSource.data = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                }, 0);
                            }, true);
                        }
                        if(attrs.fcCategories) {
                            // chartConfigObject.dataSource.categories = scope[attrs.fcCategories];
                            attrs.$observe('fcCategories', function (newVal) {
                                setTimeout(function () {
                                    chartConfigObject.dataSource.categories = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                }, 0);
                            }, true);
                        }
                        if(attrs.fcDataset) {
                            // chartConfigObject.dataSource.dataset = scope[attrs.fcDataset];
                            attrs.$observe('fcDataset', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.dataset = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }

                    }

                    var chart = new FusionCharts(chartConfigObject);
                    scope[attrs.fcChartObject] = chart;
                    chart.render ();
                }
            }
        }
    });
}());