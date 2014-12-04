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

(function () {
    var fc = angular.module('ng-fusioncharts', []);


    fc.directive('fcChart', ['$http', function ($http) {
        return {
            scope: {
                fcWidth: '@',
                fcHeight: '@',
                fcDataset: '@',
                fcCategories: '@',
                fcChartAttrs: '@'
            },
            link: function (scope, element, attrs) {
                var eventsObj = {},
                    attribs = Object.keys(attrs),
                    chart = null,
                    events = {
                        '*': function (ev, props) {
                            if(eventsObj.hasOwnProperty(ev.eventType)) {
                                eventsObj[ev.eventType](ev, props);
                          }
                        }
                    };
                if(attrs.fcEvents) {
                    if(scope.$parent[attrs.fcEvents]) {
                        var _eobj = scope.$parent[attrs.fcEvents];
                        for(var key in _eobj) {
                            if(_eobj.hasOwnProperty(key)) {
                                eventsObj[key.toLowerCase()] = _eobj[key];
                            }
                        }
                    }
                }
                for(var i=0; i<attribs.length; i++) {
                    var attr = attribs[i];
                    if(attr.match(/^on/i)) {
                        var key = attr.slice(2).toLowerCase ();
                        eventsObj[key] = scope.$parent[attrs[attr]];
                    }
                }
                if(attrs.fcConfig) {
                    chart = new FusionCharts(scope[attrs.fcConfig]);
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
                            if(chartConfigObject.dataFormat === 'json') {
                                chart.setChartData (JSON.parse(newVal));
                            } else if(chartConfigObject.dataFormat === 'xml') {
                                chart.setXMLData (newVal);
                            } else if(chartConfigObject.dataFormat === 'jsonurl') {
                                chart.setJSONUrl(newVal);
                            } else if(chartConfigObject.dataFormat === 'xmlurl') {
                                chart.setXMLUrl(newVal);
                            }
                        }, true);
                    } else {
                        attrs.$observe('fcChartAttrs', function (newVal) {
                            setTimeout(function () {
                                chartConfigObject.dataSource.chart = JSON.parse(newVal);
                                chart.setJSONData (chartConfigObject.dataSource);
                            }, 0);
                        }, true)
                        if(attrs.fcData) {
                            attrs.$observe('fcData', function (newVal) {
                                setTimeout(function () {
                                    chartConfigObject.dataSource.data = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                }, 0);
                            }, true);
                        }
                        if(attrs.fcCategories) {
                            attrs.$observe('fcCategories', function (newVal) {
                                setTimeout(function () {
                                    chartConfigObject.dataSource.categories = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                }, 0);
                            }, true);
                        }
                        if(attrs.fcDataset) {
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