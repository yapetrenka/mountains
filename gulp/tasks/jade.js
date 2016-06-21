'use strict';
//var LOCALS = require('./source/content.json');
var LOCALS = {
  "pages" : {
    "Мои работы" : "/works.html",
    "Блог" : "/blog.html",
    "Обо мне" : "/about.html",
    "Авторизация" : "/index.html"
  },
  "social" : {
    "vk" : "#",
    "github" : "#",
    "in" : "#"
  },
  "reviews" : {
    "dima" : {
      "title" : "Дмитрий Ковальчук",
      "occupation" : "основатель Loftschool",
      "ava" : "./assets/img/content/photo_dima.jpg"
    },
    "zar" : {
      "title" : "Зар Захаров",
      "occupation" : "главный преподаватель",
      "ava" : "./assets/img/content/photo_zar.jpg"
    }
  },
  "skills" : {
    "Frontend" : {
      "HTML5" : "90",
      "CSS3" : "80",
      "JavaScript& jQuery" : "50"
    },
    "Backend" : {
      "PHP" : "10",
      "Node.js& npm" : "5"
    },
    "WorkFlow" : {
      "Git" : "60",
      "Gulp" : "50",
      "Bower" : "70"
    }
  }
};
module.exports = function() {
  $.gulp.task('jade', function() {
    return $.gulp.src($.path.template)
      .pipe($.gp.jade({
          pretty: true,
          locals: LOCALS
        }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Jade',
          message:  error.message
        }
       }))
      .pipe($.gulp.dest($.config.root));
  });
};
