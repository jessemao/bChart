/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    concat: {

      dist: {
        src: ['src/head.js','src/core.js', 'src/barchart.js', 'src/tail.js'],
        dest: 'bChart.js'
      }
    },
    jshint: {
      bChart: 'bChart.js',
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {
      bChart: {
        files: {
          'bChart.min.js': 'bChart.js'
        }
      }
    },
    watch: {
      concat: {
        task: 'concat',
        files: ['src/*.js']
      },
      sass: {
        tasks: 'sass',
        files: ['src/scss/*.scss']
      }
    },
    cssmin: {
      bChart: {
        src: 'bChart.css',
        dest: 'bChart.min.css'
      }
    },
    sass: {
      options: {
        sourcemap: 'none'
      },
      bChart: {
        files: {
          'bChart.css': 'src/scss/core.scss'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'sass', 'cssmin', 'uglify']);

};
