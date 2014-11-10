// The MIT License (MIT)
// 
// Copyright (c) 2014 FusionCharts Technologies
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// Author: Ameen Ahmed <ameen@fusioncharts.com>
// 

(function () {
    var fc = angular.module('ng-fusioncharts', []);


    fc.directive('fcChart', ['$http', function ($http) {
        return {
            scope: {
                fcWidth: '@',
                fcHeight: '@',
                fcDataset: '@',
                fcCategories: '@',
                fcChartAttrs: '@',
                fcDataplotClick: '@'
            },
            link: function (scope, element, attrs) {
                var chart = null,
                    events = {
                        dataplotClick: function (ev, props) {
                            if(attrs.fcDataplotClick) {
                                scope.$apply(function () {
                                    scope.$parent[attrs.fcDataplotClick](ev, props);    
                                })
                            }
                        }
                    };
                if(attrs.fcConfig) {
                    chart = new FusionCharts(scope[attrs.fcConfig]);
                    scope[attrs.fcChartObject] = chart;
                    chart.render ();
                } else if(attrs.fcJsonUrl) {
                    var chartConfigObject = {
                        type: attrs.fcType,
                        width: attrs.fcWidth,
                        height: attrs.fcHeight,
                        renderAt: element[0],
                        dataFormat: 'json',
                        events: events
                    };
                    chart = new FusionCharts(chartConfigObject);
                    chart.setJSONUrl(attrs.fcJsonUrl);
                    scope[attrs.fcChartObject] = chart;
                    chart.render ();
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
    }
    ]);
}());