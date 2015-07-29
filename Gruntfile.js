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
          "dist/styles/style.css" : "dev/styles/style.scss"
        }
      }
    },
    watch: {
      options : {
        livereload : true,
      },
      sass : {
        files : ['dev/styles/*.scss'],
        tasks : ['sass']
      },
      bake : {
        files : ['dev/partials/**'],
        tasks : ['bake:dev']
      },
      images : {
        files : ['dev/img/*'],
        tasks : ['newer:imagemin:dynamic']
      }     
    },
    bake: {
      dev: {
        options :{
          reload : true
        },
        files : {
          "dist/index.html" : "dev/index.html"
        },
      }
    },
    imagemin : {
      dynamic : {
        files : [{
          expand : true,
          cwd : 'dev/img/',
          src : ['**/*.{png,jpg,gif,svg}'],
          dest : 'dist/img/'
        }]
      }
    },

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  // Default task.
  grunt.registerTask('default', ['sass', 'bake', 'newer:imagemin']);

};
