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
(function() {
  var fc = angular.module('ng-fusioncharts', []),
    scope = {
      width: '@',
      height: '@',
      data: '@',
      dataset: '@',
      categories: '@',
      chart: '@',
      linkeddata: '@',
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
      markers: '@',
      initialized: '&',
      datasourceDt: '=datasourceDt'
    },
    fcEvents = [
      'beforelinkeditemopen',
      'linkeditemopened',
      'beforelinkeditemclose',
      'linkeditemclosed',
      'printreadystatechange',
      'dataloadrequestcompleted',
      'dataloaderror',
      'dataloadcancelled',
      'dataloadrequestcancelled',
      'dataupdated',
      'dataupdatecancelled',
      'dataloadrequested',
      'beforedataupdate',
      'realtimeupdatecomplete',
      'chartcleared',
      'slicingend',
      'slicingstart',
      'entityrollout',
      'entityrollover',
      'entityclick',
      'connectorrollover',
      'connectorrollout',
      'connectorclick',
      'markerrollover',
      'markerrollout',
      'markerclick',
      'pagenavigated',
      'rotationend',
      'rotationstart',
      'centerlabelrollover',
      'centerlabelrollout',
      'centerlabelclick',
      'centerlabelchanged',
      'chartclick',
      'chartmousemove',
      'chartrollover',
      'chartrollout',
      'backgroundloaded',
      'backgroundloaderror',
      'legenditemclicked',
      'legenditemrollover',
      'legenditemrollout',
      'logorollover',
      'logorollout',
      'logoclick',
      'logoloaded',
      'logoloaderror',
      'beforeexport',
      'exported',
      'exportcancelled',
      'beforeprint',
      'printcomplete',
      'printcancelled',
      'datalabelclick',
      'datalabelrollover',
      'datalabelrollout',
      'scrollstart',
      'scrollend',
      'onscroll',
      'zoomreset',
      'zoomedout',
      'zoomedin',
      'zoomed',
      'zoommodechanged',
      'pinned',
      'datarestored',
      'beforedatasubmit',
      'datasubmiterror',
      'datasubmitted',
      'datasubmitcancelled',
      'chartupdated',
      'nodeadded',
      'nodeupdated',
      'nodedeleted',
      'connectoradded',
      'connectorupdated',
      'connectordeleted',
      'labeladded',
      'labeldeleted',
      'selectionremoved',
      'selectionstart',
      'selectionend',
      'labelclick',
      'labelrollover',
      'labelrollout',
      'labeldragstart',
      'labeldragend',
      'dataplotdragstart',
      'dataplotdragend',
      'processclick',
      'processrollover',
      'processrollout',
      'categoryclick',
      'categoryrollover',
      'categoryrollout',
      'milestoneclick',
      'milestonerollover',
      'milestonerollout',
      'charttypechanged',
      'overlaybuttonclick',
      'loaded',
      'rendered',
      'drawcomplete',
      'rendercomplete',
      'datainvalid',
      'dataxmlinvalid',
      'dataloaded',
      'nodatatodisplay',
      'legendpointerdragstart',
      'legendpointerdragstop',
      'legendrangeupdated',
      'alertcomplete',
      'realtimeupdateerror',
      'dataplotrollover',
      'dataplotrollout',
      'dataplotclick',
      'linkclicked',
      'beforerender',
      'rendercancelled',
      'beforeresize',
      'resized',
      'resizecancelled',
      'beforedispose',
      'disposed',
      'disposecancelled',
      'linkedchartinvoked',
      'beforedrilldown',
      'drilldown',
      'beforedrillup',
      'drillup',
      'drilldowncancelled',
      'drillupcancelled'
    ],
    currIndex,
    eventName,
    eventsLen = fcEvents.length;
  for (currIndex = 0; currIndex < eventsLen; currIndex++) {
    eventName =
      'fcevent' +
      fcEvents[currIndex][0].toUpperCase() +
      fcEvents[currIndex].slice(1);
    scope[eventName] = '&';
  }

  fc.directive('fusioncharts', [
    '$http',
    function($http) {
      return {
        scope: scope,
        link: function(scope, element, attrs) {
          function updateData() {
            // no need to check for key. datasourceDt is 2 way binded.
            // also scope.datasourceDt.key = data; is logically wrong.
            chart.setJSONData(scope.datasourceDt);
          }

          function createWatchersForAttrs(datasource) {
            const keys = Object.keys(datasource);
            keys.forEach(function(key) {
              const isDeep = key !== 'data';
              scope.$watch(
                'datasourceDt.' + key,
                function(newData, oldData) {
                  if (newData !== oldData && isDeep) updateData();
                },
                isDeep
              );
            });
          }

          var observeConf = {
              // non-data componenet observers
              NDCObserver: {
                width: {
                  ifExist: false,
                  observer: function(newVal) {
                    if (newVal && chartConfigObject.width != newVal) {
                      chartConfigObject.width = newVal;
                      chart.resizeTo(scope.width, scope.height);
                    }
                  }
                },
                height: {
                  ifExist: false,
                  observer: function(newVal) {
                    if (newVal && chartConfigObject.height != newVal) {
                      chartConfigObject.height = newVal;
                      chart.resizeTo(scope.width, scope.height);
                    }
                  }
                },
                datasource: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (dataStringStore.dataSource != newVal) {
                      dataStringStore.dataSource = newVal;
                      if (chartConfigObject.dataFormat === 'json') {
                        chartConfigObject.dataSource = JSON.parse(newVal);
                        setChartData();
                      } else {
                        chartConfigObject.dataSource = newVal;
                        if (chartConfigObject.dataFormat === 'xml') {
                          chart.setXMLData(newVal);
                        } else if (chartConfigObject.dataFormat === 'jsonurl') {
                          chart.setJSONUrl(newVal);
                        } else if (chartConfigObject.dataFormat === 'xmlurl') {
                          chart.setXMLUrl(newVal);
                        }
                      }
                    }
                  }
                },
                type: {
                  ifExist: false,
                  observer: function(newVal) {
                    if (newVal && chartConfigObject.type != newVal) {
                      chartConfigObject.type = newVal;
                      // createFCChart();
                      chart.chartType(newVal);
                    }
                  }
                },
                config: {
                  ifExist: false,
                  observer: function(newVal) {
                    var configObj,
                      attr,
                      doReRender = false;
                    if (newVal) {
                      configObj = JSON.parse(newVal);
                      for (attr in configObj) {
                        // detect the value change
                        if (chartConfigObject[attr] != configObj[attr]) {
                          doReRender = true;
                          chartConfigObject[attr] = configObj[attr];
                        }
                      }
                      if (doReRender) {
                        createFCChart();
                      }
                    }
                  }
                }
              },
              // data componenet observers
              DCObserver: {
                chart: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.chart != newVal
                    ) {
                      dataStringStore.chart = newVal;
                      chartConfigObject.dataSource.chart = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                data: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.data != newVal
                    ) {
                      dataStringStore.data = newVal;
                      chartConfigObject.dataSource.data = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                categories: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.categories != newVal
                    ) {
                      dataStringStore.categories = newVal;
                      chartConfigObject.dataSource.categories = JSON.parse(
                        newVal
                      );
                      setChartData();
                    }
                  }
                },
                dataset: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.dataset != newVal
                    ) {
                      dataStringStore.dataset = newVal;
                      chartConfigObject.dataSource.dataset = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                linkeddata: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.linkeddata != newVal
                    ) {
                      dataStringStore.linkeddata = newVal;
                      chartConfigObject.dataSource.linkeddata = JSON.parse(
                        newVal
                      );
                      setChartData();
                    }
                  }
                },
                trendlines: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.trendlines != newVal
                    ) {
                      dataStringStore.trendlines = newVal;
                      chartConfigObject.dataSource.trendlines = JSON.parse(
                        newVal
                      );
                      setChartData();
                    }
                  }
                },
                vtrendlines: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.vtrendlines != newVal
                    ) {
                      dataStringStore.vtrendlines = newVal;
                      chartConfigObject.dataSource.vtrendlines = JSON.parse(
                        newVal
                      );
                      setChartData();
                    }
                  }
                },
                annotations: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.annotations != newVal
                    ) {
                      dataStringStore.annotations = newVal;
                      chartConfigObject.dataSource.annotations = JSON.parse(
                        newVal
                      );
                      setChartData();
                    }
                  }
                },
                colorrange: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.colorrange != newVal
                    ) {
                      dataStringStore.colorrange = newVal;
                      chartConfigObject.dataSource.colorrange = JSON.parse(
                        newVal
                      );
                      setChartData();
                    }
                  }
                },
                lineset: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.lineset != newVal
                    ) {
                      dataStringStore.lineset = newVal;
                      chartConfigObject.dataSource.lineset = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                axis: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.axis != newVal
                    ) {
                      dataStringStore.axis = newVal;
                      chartConfigObject.dataSource.axis = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                connectors: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.connectors != newVal
                    ) {
                      dataStringStore.connectors = newVal;
                      chartConfigObject.dataSource.connectors = JSON.parse(
                        newVal
                      );
                      setChartData();
                    }
                  }
                },
                pointers: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.pointers != newVal
                    ) {
                      dataStringStore.pointers = newVal;
                      chartConfigObject.dataSource.pointers = JSON.parse(
                        newVal
                      );
                      setChartData();
                    }
                  }
                },
                value: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.value != newVal
                    ) {
                      dataStringStore.value = newVal;
                      chartConfigObject.dataSource.value = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                processes: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.processes != newVal
                    ) {
                      dataStringStore.processes = newVal;
                      chartConfigObject.dataSource.processes = JSON.parse(
                        newVal
                      );
                      setChartData();
                    }
                  }
                },
                tasks: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.tasks != newVal
                    ) {
                      dataStringStore.tasks = newVal;
                      chartConfigObject.dataSource.tasks = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                rows: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.rows != newVal
                    ) {
                      dataStringStore.rows = newVal;
                      chartConfigObject.dataSource.rows = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                columns: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.columns != newVal
                    ) {
                      dataStringStore.columns = newVal;
                      chartConfigObject.dataSource.columns = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                map: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.map != newVal
                    ) {
                      dataStringStore.map = newVal;
                      chartConfigObject.dataSource.map = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                },
                markers: {
                  ifExist: true,
                  observer: function(newVal) {
                    if (
                      chartConfigObject.dataFormat === 'json' &&
                      typeof chartConfigObject.dataSource == 'object' &&
                      dataStringStore.markers != newVal
                    ) {
                      dataStringStore.markers = newVal;
                      chartConfigObject.dataSource.markers = JSON.parse(newVal);
                      setChartData();
                    }
                  }
                }
              }
            },
            eventsObj = {},
            attribs = Object.keys(attrs),
            chart = null,
            events = {
              '*': function(ev, props) {
                if (eventsObj.hasOwnProperty(ev.eventType)) {
                  eventsObj[ev.eventType](ev, props);
                }
              }
            },
            setDataTimer,
            setChartData = function() {
              // clear previous dataUpdate timer
              if (setDataTimer) {
                clearTimeout(setDataTimer);
              }
              // Update the data with setTimeout
              // This will solve the issue of consiquitive data update within very small interval
              setDataTimer = setTimeout(function() {
                if (chart && chart.setJSONData) {
                  chart.setJSONData(chartConfigObject.dataSource);
                }
              }, 0);
              // chart.setJSONData(chartConfigObject.dataSource);
            },
            createFCChart = function() {
              // dispose if previous chart exists
              if (chart && chart.dispose) {
                chart.dispose();
              }
              chart = new FusionCharts(chartConfigObject);
              scope.initialized && scope.initialized({ chart: chart });
              for (currIndex = 0; currIndex < eventsLen; currIndex++) {
                eventName =
                  'fcevent' +
                  fcEvents[currIndex][0].toUpperCase() +
                  fcEvents[currIndex].slice(1);
                // assign all events on chart instance
                (function(eventName) {
                  chart.addEventListener(fcEvents[currIndex], function(
                    event,
                    args
                  ) {
                    scope[eventName] &&
                      scope[eventName]({ event: event, args: args });
                  });
                })(eventName);
              }
              /* @todo validate the ready function whether it can be replaced in a better way */
              angular.element(document).ready(function() {
                element.ready(function() {
                  // Render the chart only when angular is done compiling the element and DOM.
                  chart = chart.render();
                  scope[attrs.chartobject] = chart;
                });
              });
            },
            dataStringStore = {},
            i,
            attr,
            _eobj,
            key,
            observableAttr,
            chartConfigObject,
            configObj,
            dataComponent,
            eventScopeArr,
            l;

          if (attrs.events) {
            eventScopeArr = attrs.events.split('.');
            l = eventScopeArr.length;
            _eobj = scope.$parent;
            for (i = 0; i < l; i += 1) {
              _eobj = _eobj && _eobj[eventScopeArr[i]];
            }
            if (_eobj) {
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

          for (observableAttr in observeConf.NDCObserver) {
            attrConfig = observeConf.NDCObserver[observableAttr];
            if (attrConfig.ifExist === false || attrs[observableAttr]) {
              attrs.$observe(observableAttr, attrConfig.observer);
            }
          }

          if (attrs.datasource) {
            chartConfigObject.dataSource =
              chartConfigObject.dataFormat === 'json'
                ? JSON.parse(attrs.datasource)
                : attrs.datasource;
            dataStringStore.dataSource = attrs.datasource;
          }

          for (observableAttr in observeConf.DCObserver) {
            attrConfig = observeConf.DCObserver[observableAttr];
            dataComponent = attrs[observableAttr];
            if (dataComponent) {
              attrs.$observe(observableAttr, attrConfig.observer);
              dataStringStore[observableAttr] = dataComponent;
              if (
                chartConfigObject.dataFormat === 'json' &&
                typeof chartConfigObject.dataSource === 'object'
              ) {
                chartConfigObject.dataSource[observableAttr] = JSON.parse(
                  dataComponent
                );
              }
            } else if (attrConfig.ifExist === false) {
              attrs.$observe(observableAttr, attrConfig.observer);
            }
          }

          // add configurations from config
          if (attrs.config) {
            configObj = JSON.parse(attrs.config);
            for (attr in configObj) {
              chartConfigObject[attr] = configObj[attr];
            }
          }

          createFCChart();

          if (attrs.type.toLowerCase() === 'timeseries' && scope.datasourceDt) {
            scope.$watch(
              'datasourceDt.data',
              function(newData, oldData) {
                if (newData !== oldData) updateData();
              },
              false
            );
            createWatchersForAttrs(scope.datasourceDt);
            // set the data anyway, initially.
            chart.setJSONData(scope.datasourceDt);
          } else if (scope.datasourceDt) {
            attrs.datasourceDt = scope.datasourceDt;
            chartConfigObject.dataSource = scope.datasourceDt;
            dataStringStore.dataSource = scope.datasourceDt;
            setChartData();
            scope.$watch(
              'datasourceDt',
              function(newData, oldData) {
                if (newData !== oldData) {
                  chartConfigObject.dataSource = scope.datasourceDt;
                  dataStringStore.dataSource = scope.datasourceDt;
                  setChartData();
                  if (chartConfigObject.dataFormat === 'json') {
                    setChartData();
                  } else {
                    if (chartConfigObject.dataFormat === 'xml') {
                      chart.setXMLData(newData);
                    } else if (chartConfigObject.dataFormat === 'jsonurl') {
                      chart.setJSONUrl(newData);
                    } else if (chartConfigObject.dataFormat === 'xmlurl') {
                      chart.setXMLUrl(newData);
                    }
                  }
                }
              },
              true
            );
          }

          scope.$on('$destroy', function() {
            // on destroy free used resources to avoid memory leaks
            if (chart && chart.dispose) {
              chart.dispose();
            }
          });
        }
      };
    }
  ]);
})();
