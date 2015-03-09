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


    fc.directive('fusioncharts', ['$http', function ($http) {
        return {
            scope: {
                width: '@',
                height: '@',
                data: '@',
                dataset: '@',
                categories: '@',
                chart: '@',
                linkdedata: '@',
                trendlines: '@',
                vtrendlines: '@',
                annotations: '@',
                colorrange: '@',
                lineset: '@',
                axis: '@',
                connectors: '@',
                pointers: '@',
                value: '@',
                processes: '@',
                tasks: '@',
                rows: '@',
                columns: '@',
                map: '@',
                markers: '@'
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
                if(attrs.events) {
                    if(scope.$parent[attrs.events]) {
                        var _eobj = scope.$parent[attrs.events];
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
                if(attrs.config) {
                    chart = new FusionCharts(scope[attrs.config]);
                    scope[attrs.chartobject] = chart;
                    chart.render ();
                } else {
                    var chartConfigObject = {
                        type: attrs.type,
                        width: attrs.width,
                        height: attrs.height,
                        renderAt: element[0],
                        dataFormat: attrs.dataformat || 'json',
                        dataSource: {},
                        events: events
                    };
                    attrs.$observe('width', function (newVal) {
                        chart.resizeTo (scope.width, scope.height);
                    });
                    attrs.$observe('height', function (newVal) {
                        chart.resizeTo (scope.width, scope.height);
                    });
                    if(attrs.datasource) {
                        chartConfigObject.dataSource = scope[attrs.datasource];
                        attrs.$observe('datasource', function (newVal) {
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
                        attrs.$observe('type', function (newVal) {
                            setTimeout(function () {
                                chartConfigObject.type = newVal;
                                if (chart)
                                {
                                    chart.dispose();
                                    chart = new FusionCharts(chartConfigObject);
                                    scope[attrs.chartobject] = chart;
                                    chart.render();
                                }
                            }, 0);
                        }, true)
                        attrs.$observe('chart', function (newVal) {
                            setTimeout(function () {
                                chartConfigObject.dataSource.chart = JSON.parse(newVal);
                                chart.setJSONData (chartConfigObject.dataSource);
                            }, 0);
                        }, true)
                        if(attrs.data) {
                            attrs.$observe('data', function (newVal) {
                                setTimeout(function () {
                                    chartConfigObject.dataSource.data = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                }, 0);
                            }, true);
                        }
                        if(attrs.categories) {
                            attrs.$observe('categories', function (newVal) {
                                setTimeout(function () {
                                    chartConfigObject.dataSource.categories = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                }, 0);
                            }, true);
                        }
                        if(attrs.dataset) {
                            attrs.$observe('dataset', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.dataset = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.linkeddata) {
                            attrs.$observe('linkeddata', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.linkeddata = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.trendlines) {
                            attrs.$observe('trendlines', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.trendlines = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.vtrendlines) {
                            attrs.$observe('vtrendlines', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.vtrendlines = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.annotations) {
                            attrs.$observe('annotations', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.annotations = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.colorrange) {
                            attrs.$observe('colorrange', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.colorrange = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.lineset) {
                            attrs.$observe('lineset', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.lineset = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.axis) {
                            attrs.$observe('axis', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.axis = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.connectors) {
                            attrs.$observe('connectors', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.connectors = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.pointers) {
                            attrs.$observe('pointers', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.pointers = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.value) {
                            attrs.$observe('value', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.value = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.processes) {
                            attrs.$observe('processes', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.processes = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.tasks) {
                            attrs.$observe('tasks', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.tasks = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.rows) {
                            attrs.$observe('rows', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.rows = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.columns) {
                            attrs.$observe('columns', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.columns = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.map) {
                            attrs.$observe('map', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.map = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                        if(attrs.markers) {
                            attrs.$observe('markers', function (newVal) { 
                                setTimeout(function () {
                                    chartConfigObject.dataSource.markers = JSON.parse(newVal);
                                    chart.setJSONData (chartConfigObject.dataSource);
                                });
                            }, true);
                        }
                    }

                    var chart = new FusionCharts(chartConfigObject);
                    scope[attrs.chartobject] = chart;
                    chart.render ();
                }
            }
        }
    }
    ]);
}());
