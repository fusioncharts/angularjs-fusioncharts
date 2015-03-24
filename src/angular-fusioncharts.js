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
                    var observeConf = {
                        'width': {
                            ifExist: false,
                            observer: function (newVal) {
                                chart.resizeTo(scope.width, scope.height);
                            }
                        },
                        'height': {
                            ifExist: false,
                            observer: function (newVal) {
                                chart.resizeTo(scope.width, scope.height);
                            }
                        },
                        'chart': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.chart = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    }, 0);
                                }
                            }
                        },
                        'data': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.data = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    }, 0);
                                }
                            }
                        },
                        'categories': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.categories = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    }, 0);
                                }
                            }
                        },
                        'dataset': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.dataset = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'linkeddata': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.linkeddata = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'trendlines': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.trendlines = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'vtrendlines': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.vtrendlines = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'annotations': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.annotations = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'colorrange': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.colorrange = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'lineset': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.lineset = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'axis': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.axis = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'connectors': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.connectors = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'pointers': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.pointers = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'value': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.value = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'processes': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.processes = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'tasks': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.tasks = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'rows': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.rows = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'columns': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.columns = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'map': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.map = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            },
                        },
                        'markers': {
                            ifExist: true,
                            observer: function (newVal) {
                                if (chartConfigObject.dataFormat === 'json' && typeof chartConfigObject.dataSource == "object") {
                                    setTimeout(function () {
                                        chartConfigObject.dataSource.markers = JSON.parse(newVal);
                                        chart.setJSONData(chartConfigObject.dataSource);
                                    });
                                }
                            }
                        },
                        'datasource': {
                            ifExist: true,
                            observer: function (newVal) {
                                chartConfigObject.dataSource = newVal;
                                if (chartConfigObject.dataFormat === 'json') {
                                    chartConfigObject.dataSource = JSON.parse(newVal);
                                    chart.setChartData(chartConfigObject.dataSource);
                                } else if (chartConfigObject.dataFormat === 'xml') {
                                    chart.setXMLData(newVal);
                                } else if (chartConfigObject.dataFormat === 'jsonurl') {
                                    chart.setJSONUrl(newVal);
                                } else if (chartConfigObject.dataFormat === 'xmlurl') {
                                    chart.setXMLUrl(newVal);
                                }
                            }
                        },
                        'config': {
                            ifExist: false,
                            observer: function (newVal) {
                                var configObj = JSON.parse(newVal),
                                attr;
                                for (attr in configObj) {
                                    chartConfigObject[attr] = configObj[attr];
                                }
                                createFCChart();
                            }
                        }
                    },
                    eventsObj = {},
                    attribs = Object.keys(attrs),
                    chart = null,
                    events = {
                        '*': function (ev, props) {
                            if (eventsObj.hasOwnProperty(ev.eventType)) {
                                eventsObj[ev.eventType](ev, props);
                            }
                        }
                    },
                    createFCChart = function () {
                        // dispose if previous chart exists
                        if(chart && chart.dispose){
                            chart.dispose();
                        }
                        chart = new FusionCharts(chartConfigObject);
                        scope[attrs.chartobject] = chart;
                        chart.render();
                    },
                    i,
                    attr,
                    _eobj,
                    key,
                    observableAttr,
                    chartConfigObject,
                    configObj;

                    if (attrs.events) {
                        if (scope.$parent[attrs.events]) {
                            _eobj = scope.$parent[attrs.events];
                            for (key in _eobj) {
                                if (_eobj.hasOwnProperty(key)) {
                                    eventsObj[key.toLowerCase()] = _eobj[key];
                                }
                            }
                        }
                    }
                    for (i = 0; i < attribs.length; i++) {
                        attr = attribs[i];
                        if (attr.match(/^on/i)) {
                            key = attr.slice(2).toLowerCase();
                            eventsObj[key] = scope.$parent[attrs[attr]];
                        }
                    }


                    chartConfigObject = {
                        type: attrs.type,
                        width: attrs.width,
                        height: attrs.height,
                        renderAt: element[0],
                        id: attrs.chartid,
                        dataFormat: attrs.dataformat || 'json',
                        dataSource: {},
                        events: events
                    };

                    for (observableAttr in observeConf) {
                        attrConfig = observeConf[observableAttr];
                        if (attrConfig.ifExist === false || attrs[observableAttr]) {
                            attrs.$observe(observableAttr, attrConfig.observer);
                        }
                    }


                    createFCChart();
                }
            };
        }
    ]);
}());