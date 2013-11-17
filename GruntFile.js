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
        standalone: 'APP'
      }
    },

    uglify: {
       build: {
         src: 'public/<%= pkg.name %>.js',
         dest: 'public/<%= pkg.name %>.min.js'
       }
     }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['browserify', 'uglify']);
};
