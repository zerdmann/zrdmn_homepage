/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
  bake: {
      dev: {
        files : {
          "dist/index.html" : "dev/index.html",
          "dist/work/index.html" : "dev/work/index.html",
          "dist/work/penzeys/index.html" : "dev/work/penzeys/index.html",
          "dist/work/wedding/index.html" : "dev/work/wedding/index.html",
          "dist/work/koe/index.html" : "dev/work/koe/index.html",
          "dist/work/johnmarla/index.html" : "dev/work/johnmarla/index.html",
          "dist/work/other/index.html" : "dev/work/other/index.html",
        },
      },
    },

  sass : {
      dev : {
        files : {
          "dist/styles/style.css" : "dev/styles/style.scss",
          "dist/styles/work_style.css" : "dev/styles/work_style.scss",
          "dist/styles/work_page.css" : "dev/styles/work_page.scss"
        }
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

  clean : {
    build : ['dist/']
    },
  copy : {
      assets: {
        expand: true,
        cwd : 'dev/assets/',
        src : '**',
        dest : 'dist/assets/',
        fiter: 'isFile'
      }
    },
 //Development tasks - Server connnect and Watch   
    connect : {
      server : {
        options: {
          base: 'dist',
          keepalive: true,
          open: true
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
        tasks : ['bake:dev']
      },
      images : {
        files : ['dev/img/*'],
        tasks : ['newer:imagemin:dynamic']
      },
      assets : {
        files : ['dev/assets/**'],
        tasks : ['newer:copy:assets']
      }
    },
 
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');


  // Default task.
  grunt.registerTask('prep', ['clean', 'copy:assets', 'bake', 'sass', 'imagemin', 'connect']);
  grunt.registerTask('build', ['clean', 'copy:assets', 'bake', 'sass', 'imagemin']);
  grunt.registerTask('dev', ['bake','sass','imagemin']);
  grunt.registerTask('default', ['dev']);
};
