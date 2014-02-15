module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      build: {
        src: 'client.js',
        dest: 'public/<%= pkg.name %>.js'
      },
      options: {
        standalone: 'APP',
        transform: [require('browserify-hogan')]
      }
    },

    watch: {
      scripts: {
        files: ['lib/**/*.js', 'client/**/*.js', 'client.js', 'client/*.js', 'main.css', 'views/**/*.html'],
        tasks: ['default']
      }
    },

    uglify: {
       build: {
         src: 'public/<%= pkg.name %>.js',
         dest: 'public/<%= pkg.name %>.min.js'
       }
     },

    sass: {
      dist: {
        files: {
          'public/<%= pkg.name %>.css' : 'main.scss'
        },
        options: {
          loadPath: 'bower_components',
          style: 'compressed'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['browserify', 'uglify', 'sass']);
};
