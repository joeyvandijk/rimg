/*
 * Copyright (c) 2013 Joey van Dijk.
 */

'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        pkg: grunt.file.readJSON('package.json'),
        meta:{
            version:'0.1.0',
            banner:'/*! PROJECT_NAME - v<%= meta.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* http://github.com/joeyvandijk/rimg/\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                'Joey van Dijk; Licensed MIT */'
        },
        uglify: {
            options: {
                banner: '/*! http://github.com/joeyvandijk/rimg/ - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                compress: true,
                preserveComments:false,
                mangle:false,
                beautify:false
            },
            target:{
            	files: {
                	'temp/rimg-uglify.js' : ['rimg.js'],
                	'rimg.min.js' : ['rimg.js']
            	}
            }            
        },
        clean:{
            options:{
                force:true
            },
            files:'temp'
        },
        compress: {
            deploy: {
                options: {
                    mode: 'gzip'
                },
                files:[
                    {flatten: true,src: ['temp/rimg-uglify.js'],dest: 'rimg.min.js'}
                ]
            }
        },
        copy:{
            target:{
                files:[{flatten: true,src: ['rimg.min.js'],dest: 'test/examples/rimg.min.js'}]
            }
        },
        notify:{
            options:{
                title:'Build completed',
                message:'Finished all tasks.'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-notify');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('build', ['uglify','compress','clean','copy','notify']);
}
