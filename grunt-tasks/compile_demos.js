var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
module.exports = function(grunt) {
  var demosRoot = './demos/demosources';
  var demosList = [
    'ex1',
    'ex25',
    'ex29',
    'ex30',
    'ex2',
    'ex13',
    'ex3',
    'ex27',
    'ex26',
    'ex28',
    'ex4',
    'ex5a',
    'ex5',
    'ex6',
    'ex7',
    'ex8',
    'ex9',
    'ex15',
    'ex12',
    'ex35',
    'ex32',
    'ex33',
    'ex34',
    'ex14',
    'ex10',
    'ex16',
    'ex17',
    'ex18',
    'ex19',
    'ex20',
    'ex21',
    'ex22',
    'ex23',
    'ex24',
    'ex31'
  ];

  grunt.task.registerMultiTask(
    'makeDemos',
    'Makes the Demo Browser app',
    function() {
      var options = this.options({});
      var mainTemplate = grunt.file.read('./demos/src/' + options.mainTemplate);
      var codeboxTemplate = grunt.file.read('./demos/src/codebox.ejs');
      var codeboxTemplateFt = grunt.file.read('./demos/src/codebox-ft.ejs');

      var demosMeta = [];
      grunt.file.mkdir(options.out + '/js/demos');
      grunt.file.mkdir(options.out + '/views');
      grunt.file.mkdir(options.out + '/data');

      for (var i = 0; i < demosList.length; i++) {
        var config = JSON.parse(
          grunt.file.read(
            path.join(demosRoot, demosList[i] + '/config.json'),
            'utf-8'
          )
        );

        var viewTemplate = grunt.file.read(
          path.join(demosRoot, demosList[i] + '/src.ejs'),
          'utf-8'
        );
        var htmlView = ejs.render(viewTemplate, { src: 'html' });
        var jsView = ejs.render(viewTemplate, { src: 'js' });
        var schemaView = ejs.render(viewTemplate, { src: 'schema' });
        var dataView = ejs.render(viewTemplate, { src: 'data' });
        var jsSrc = grunt.file.read(
          path.join(demosRoot, demosList[i] + '/index.js'),
          'utf-8'
        );
        var htmlSrc = config.fusiontime
          ? grunt.file.read(
              path.join(demosRoot, demosList[i] + '/index.html'),
              'utf-8'
            ) + codeboxTemplateFt
          : grunt.file.read(
              path.join(demosRoot, demosList[i] + '/index.html'),
              'utf-8'
            ) + codeboxTemplate;
        demosMeta.push({
          script: 'js/demos/' + demosList[i] + '.js',
          jsCode: JSON.stringify(jsView),
          htmlCode: JSON.stringify(htmlView),
          schemaCode: JSON.stringify(schemaView),
          dataCode: JSON.stringify(dataView),
          title: config.title,
          desc: config.desc,
          fusiontime: config.fusiontime,
          id: demosList[i]
        });
        grunt.file.write(
          path.join(options.out + '/js/demos', '/' + demosList[i] + '.js'),
          jsSrc
        );
        grunt.file.write(
          path.join(options.out + '/views', '/' + demosList[i] + '.html'),
          htmlSrc
        );
      }
      grunt.file.copy('./demos/src/data.json', options.out + '/data/data.json');
      var mainHTML = ejs.render(mainTemplate, { demos: demosMeta });
      grunt.file.write(options.out + '/index.html', mainHTML);
    }
  );
};
