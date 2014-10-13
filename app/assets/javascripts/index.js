$(document).ready (function () {

  var showQuizzes = function () {
    $.get("/quizzes", function (data) {
      listQuizzes(data);
    });
  };

  var listQuizzes = function (quiz_array) {
    _.each(quiz_array, function (q) {
      var template = $(".quiz-list").html();
      var compiledTemplate = _.template(template)({
        quiz: {
          title: q.title,
          id: q.id
        }
      });

      var $el = $(compiledTemplate);
      $('#quiz-select').find('select').append($el);

    });
  };

  var playQuiz = function (quiz_id, n, score) {


    $.get("/quizzes/" + quiz_id, function (data) {


    })
      .done(function () {
        $.get("/quizzes/" + quiz_id + "/questions", function (data) {
          $('#questions-container').empty();
          // console.log(data);

          var view = {
            answer: data[n].answer,
            choices: data[n].choices.split(";"),
            question: data[n].question,
            question_type: data[n].question_type,
            template: _.template($(".quiz-question").html())
          }

            $('#questions-container').append(view.template());

            $('.answer-form').submit(function (e) {
              e.preventDefault();
              var answer = $('#answer').val();

              // process answer
              $.get("/quizzes/" + quiz_id + "/questions/" + data[n].id + "/check?answer=" + answer , function (data) {
               if (data.correct === true) {
                  score ++;
                  $('.answer-validation').append("<p>Correct!</p>");
                } else if (data.correct === false) {
                  $('.answer-validation').append("<p>Incorrect</p>");
                }
              }) 
                .done(function () {
                  // show next question
                  if (n < data.length-1) {
                    setTimeout(function () {
                      n ++;
                      playQuiz(quiz_id, n, score);
                    }, 1000);
                  } else {
                    // show score
                    $('.score-summary').append("<p>You got " + score + " out of " + data.length + " questions correct.</p>")
                  }
                });

            });

        })

      }); 

  };

  showQuizzes();

  $('#quiz-select').find('.target').change(function () {
    // 
    var quiz_id = $("select option:selected").data('quiz-id');
    $('#questions-container').empty();
    playQuiz(quiz_id, 0, 0);
  });

});


