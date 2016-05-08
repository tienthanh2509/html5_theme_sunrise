module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // Task define
    grunt.initConfig({
        // Sass compiler
        sass: {// Task
            dist: {// Target
                options: {// Target options
                    style: 'expanded',
					cacheLocation: '/tmp/.sass-cache'
                },
                files: {// Dictionary of files
                    'public/assets/css/sunrise.css': 'scss/sunrise/sunrise.scss' // 'destination': 'source'
                }
            }
        },
        // CSS minify
        cssmin: {
            options: {
                compatibility: 'ie9',
                keepSpecialComments: '*',
                sourceMap: true,
                advanced: false
            },
            dist: {
                files: {
                    'public/assets/css/sunrise.min.css': ['public/assets/css/sunrise.css']
                }
            }
        }
    });

    // Enable plugin
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task.
    grunt.registerTask('default', ['sass:dist', 'cssmin:dist']);
};
