module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mocha_istanbul: {
            coverage: {
                src: 'test', // a folder works nicely
                options: {
                    mask: '*.js'
                }
            },
            coveralls: {
                src: ['test'],
                // Options relevant to all targets
                options: {
                    coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered
                    reportFormats: ['lcovonly']
                }

            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            }
        },


    });

    grunt.event.on('coverage', function(lcovFileContents, done) {
        // Check below on the section "The coverage event"
        done();
    });


    //grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
    grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
    grunt.registerTask('mocha', ['mochaTest']);


};
