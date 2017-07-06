module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mocha_istanbul: {
            coverage: {
                src: 'test', // a folder works nicely
                options: {
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

        coveralls: {
            // Options relevant to all targets
            options: {
                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            },

            your_target: {
                // LCOV coverage file (can be string, glob or array)
                src: 'coverage/lcov.info',
                options: {
                    // Any options for just this target
                }
            },
        }



    });


    //grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
    grunt.registerTask('mocha', ['mochaTest']);
    grunt.registerTask('coverallio', ['coveralls'])


};
