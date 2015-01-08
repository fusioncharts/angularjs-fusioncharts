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
                fcData: '@',
                fcDataset: '@',
                fcCategories: '@',
                fcChartAttrs: '@',
                fcLinkeddata: '@',
                fcTrendlines: '@',
                fcVtrendlines: '@',
                fcAnnotatations: '@',
                fcColorrange: '@',
                fcLineset: '@',
                fcAxis: '@',
                fcConnectors: '@',
                fcPointers: '@',
                fcValue: '@',
                fcProcesses: '@',
                fcTasks: '@',
                fcRows: '@',
                fcColumns: '@',
                fcMap: '@',
                fcMarkers: '@'
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
                        if(attrs.fcLinkeddata) {
                            attrs.$observe('fcLinkeddata', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.linkeddata = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcTrendlines) {
                            attrs.$observe('fcTrendlines', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.trendlines = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcVtrendlines) {
                            attrs.$observe('fcVtrendlines', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.vtrendlines = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcAnnotations) {
                            attrs.$observe('fcAnnotations', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.annotations = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcColorrange) {
                            attrs.$observe('fcColorrange', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.colorrange = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcLineset) {
                            attrs.$observe('fcLineset', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.lineset = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcAxis) {
                            attrs.$observe('fcAxis', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.axis = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcConnectors) {
                            attrs.$observe('fcConnectors', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.connectors = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcPointers) {
                            attrs.$observe('fcPointers', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.pointers = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcValue) {
                            attrs.$observe('fcValue', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.value = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcProcesses) {
                            attrs.$observe('fcProcesses', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.processes = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcTasks) {
                            attrs.$observe('fcTasks', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.tasks = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcRows) {
                            attrs.$observe('fcRows', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.rows = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcColumns) {
                            attrs.$observe('fcColumns', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.columns = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcMap) {
                            attrs.$observe('fcMap', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.map = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.fcMarkers) {
                            attrs.$observe('fcMarkers', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.markers = JSON.parse(newVal);
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