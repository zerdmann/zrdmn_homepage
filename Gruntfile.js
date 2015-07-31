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
          "dist/styles/style.css" : "dev/styles/style.scss",
          "dist/styles/work_style.css" : "dev/styles/work_style.scss"
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
      },
      assets : {
        files : ['dev/assets/**'],
        tasks : ['newer:copy:assets']
      }
    },
    bake: {
      dev: {
        options :{
          dev : true
        },
        files : {
          "dist/index.html" : "dev/index.html",
          "dist/work/index.html" : "dev/work/index.html"
        },
      },
      commit: {
        options: {
        },
        files : {
          "dist/index.html" : "dev/index.html",
          "dist/work/index.html" : "dev/work/index.html"
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
    clean : ['dist/'],
    copy : {
      assets: {
        expand: true,
        cwd : 'dev/assets/',
        src : '**',
        dest : 'dist/assets/',
        fiter: 'isFile'
      }
    },
    connect : {
      server : {
        options: {
          base: 'dist',
          keepalive: true,
          open: true
        }
      }

    }  
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
  grunt.registerTask('default', ['sass', 'bake:dev', 'newer:imagemin', 'connect']);
  grunt.registerTask('prep', ['clean', 'copy:assets', 'bake:dev', 'sass', 'imagemin']);
  grunt.registerTask('commit', ['clean', 'copy:assets', 'bake:commit', 'sass', 'imagemin']);

};
