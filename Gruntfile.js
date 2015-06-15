/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    sass : {
      dev : {
        files : {
          "dist/styles/main.css" : "dev/styles/main.scss"
        }
      }
    },
    watch: {
      sass : {
        files : ['dev/styles/*.scss'],
        tasks : ['sass']
      },
      bake : {
        files : ['dev/partials/**'],
        tasks ; ['bake:dev']

      }     
    },
    bake: {
      dev: {
        files : {
          "dist/index.html" : "dev/index.html"
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['sass', 'bake']);

};
