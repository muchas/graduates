module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // compass: {                  // Task
        //     dist: {                   // Target
        //         options: {              // Target options
        //             config: 'src/App/Frontend/assets/config.rb',
        //             specify: [

        //                 'src/App/Frontend/assets/stylesheets/*.scss',
        //                 'src/App/Frontend/assets/sass/style.scss'
        //             ],
        //             outputStyle: 'compressed',
        //             environment: 'production'
        //         }
        //     }
        // },
        watch: {
//             css: {
//                 files: [
//                     'src/App/Frontend/assets/stylesheets/*.css',
//                     'src/App/Frontend/assets/sass/style.scss',
//                     'src/App/Frontend/assets/sass/*.scss',
//                     'src/App/Frontend/assets/sass/librarys/*.scss'
//                 ],
//                 tasks: ['copy', 'compass']
//             },
             js: {
                 files: [
                     'apps/home/static/js/*.js',
                     'apps/home/static/js/*/*.js',
                     'apps/home/static/js/*/*/*.js',
                     'apps/home/static/js/templates/*.handlebars'
                 ],
                 tasks: ['handlebars', 'concat']
             }
        },

        // copy: {
        //     main: {
        //         files: [
        //             {
        //                 cwd: 'src/App/Frontend/assets/fonts/',
        //                 src: '*/*',
        //                 dest: 'web/dist/fonts/',
        //                 expand: true
        //             },
        //             {
        //                 cwd: 'src/App/Frontend/assets/images/',
        //                 src: '*',
        //                 dest: 'web/dist/images/',
        //                 expand: true
        //             },
        //             {
        //                 cwd: 'src/App/Frontend/assets/images/avatars/',
        //                 src: '*',
        //                 dest: 'web/dist/images/avatars/',
        //                 expand: true
        //             },
        //             {
        //                 cwd: 'src/App/Frontend/assets/images/layout_error/',
        //                 src: '*',
        //                 dest: 'web/dist/images/layout_error/',
        //                 expand: true
        //             },
        //             {
        //                 cwd: 'src/App/Frontend/assets/images/blank_pages/',
        //                 src: '*',
        //                 dest: 'web/dist/images/blank_pages/',
        //                 expand: true
        //             },
        //             {
        //                 cwd: 'src/App/Frontend/assets/images/icons/',
        //                 src: '*',
        //                 dest: 'web/dist/images/icons/',
        //                 expand: true
        //             },
        //             {
        //                 cwd: 'src/App/Frontend/assets/images/landing_page/',
        //                 src: '*',
        //                 dest: 'web/dist/images/landing_page/',
        //                 expand: true
        //             },
        //             {
        //                 cwd: 'src/App/Frontend/assets/images/request_form/',
        //                 src: '*',
        //                 dest: 'web/dist/images/request_form/',
        //                 expand: true
        //             }
        //         ]
        //     }
        // },

        handlebars: {
            compile: {
                options: {
                    namespace: "Handlebars.templates",
                    processName: function(filePath) {
                        var pathArray = filePath.split("/");
                        var fileName = pathArray[pathArray.length-1];

                        return fileName.split(".")[0];
                    }
                },
                files: {
                    'static/js/handlebars.js': [
                        "apps/home/static/js/templates/*.handlebars"
                    ]
                }
            }
        },

        concat: {
             dist: {
                 src: [
                     "apps/home/static/js/libs/jquery-1.11.2.min.js",
                     "apps/home/static/js/libs/underscore-min.js",
                     "apps/home/static/js/libs/backbone-min.js",
                     "apps/home/static/js/libs/backbone-forms.min.js",
                     "apps/home/static/js/libs/backbone.wreqr.min.js",
                     "apps/home/static/js/libs/backbone.babysitter.min.js",
                     "apps/home/static/js/libs/backbone.marionette.min.js",
                     "apps/home/static/js/libs/handlebars-v3.0.0.js",
                     "apps/home/static/js/libs/moment-with-locales.min.js",
                     "static/js/handlebars.js",

                     "app/home/static/js/config.js",
                     "app/home/static/js/commands/base.js",
                     "app/home/static/js/commands/*.js",
                     "app/home/static/js/form/*.js",
                     "app/home/static/js/views/item/*.js",
                     "app/home/static/js/views/collection/*.js",
                     "app/home/static/js/views/layout/*.js",
                     "app/home/static/js/models/*.js",
                     "app/home/static/js/controllers/*.js",
                     "app/home/static/js/routers/*.js",

                     "app/home/static/js/app.js"
                 ],
                 dest: 'static/js/app.min.js'
             }
        },

        uglify: {
             //css: {
             //    files: {
             //        'web/dist/stylesheets/libs.css': [
             //            "assets/stylesheets/normalize.css",
             //            "assets/stylesheets/jquery-ui.min.css",
             //            "assets/stylesheets/jquery-ui.structure.min.css",
             //            "assets/stylesheets/select2.css",
             //            "assets/stylesheets/select2-bootstrap.css",
             //            "web/dist/stylesheets/style.css"
             //        ]
             //    }
             //},
             js: {
                 files: {
                     'static/js/app.min.js': [
                         "apps/home/static/js/libs/jquery-1.11.2.min.js",
                         "apps/home/static/js/libs/underscore-min.js",
                         "apps/home/static/js/libs/backbone-min.js",
                         "apps/home/static/js/libs/backbone-forms.min.js",
                         "apps/home/static/js/libs/backbone.wreqr.min.js",
                         "apps/home/static/js/libs/backbone.babysitter.min.js",
                         "apps/home/static/js/libs/backbone.marionette.min.js",
                         "apps/home/static/js/libs/handlebars-v3.0.0.js",
                         "apps/home/static/js/libs/moment-with-locales.min.js",
                         "static/js/handlebars.js",

                         "app/home/static/js/config.js",
                         "app/home/static/js/commands/base.js",
                         "app/home/static/js/commands/*.js",
                         "app/home/static/js/form/*.js",
                         "app/home/static/js/views/item/*.js",
                         "app/home/static/js/views/collection/*.js",
                         "app/home/static/js/views/layout/*.js",
                         "app/home/static/js/models/*.js",
                         "app/home/static/js/controllers/*.js",
                         "app/home/static/js/routers/*.js",

                         "app/home/static/js/app.js"

                     ]
                 }
             }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['handlebars', 'uglify']);
    grunt.registerTask('livecss', ['watch:css']);
    grunt.registerTask('livejs', ['watch:js']);
    grunt.registerTask('concatjs', ['concat']);

};