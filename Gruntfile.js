module.exports = function(grunt) {
    grunt.initConfig({
        makeDemos: {
            demos: {
                options: {
                    mainTemplate: 'index.ejs',
                    out: 'demos'
                }
            },
            gh_pages: {
                options: {
                    mainTemplate: 'index.ghpages.ejs',
                    out: './'
                }
            }
        }
    });

    grunt.loadTasks('./grunt-tasks');

    grunt.registerTask('default', ['makeDemos']);
};
