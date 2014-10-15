$(document).ready (function () {


  // var showQuizzes = function () {
  //   $.get("/quizzes", function (data) {
  //     listQuizzes(data);
  //   });
  // };

  // var listQuizzes = function (quiz_array) {
  //   _.each(quiz_array, function (q) {
  //     var template = $(".quiz-list").html();
  //     var compiledTemplate = _.template(template)({
  //       quiz: {
  //         title: q.title,
  //         id: q.id
  //       }
  //     });

  //     var $el = $(compiledTemplate);
  //     $('#quiz-select').find('select').append($el);

  //   });
  // };


  // var checkAnswer = function (quiz_id, question_id, n, score, qlength) {
  //   $('.answer-form').submit(function (e) {
  //     e.preventDefault();
  //     var answer = $('input[type="radio"]:checked').val();

  //     // process answer
  //     $.get("/quizzes/" + quiz_id + "/questions/" + question_id + "/check?answer=" + answer , function (data) {
  //      if (data.correct === true) {
  //         score ++;
  //         $('.answer-validation').append("<p>Correct!</p>");
  //       } else if (data.correct === false) {
  //         $('.answer-validation').append("<p>Incorrect</p>");
  //       }
  //     }) 
  //       .done(function () {
  //         // show next question
  //         if (n < qlength-1) {
  //           setTimeout(function () {
  //             n ++;
  //             playQuiz(quiz_id, n, score);
  //           }, 1000);
  //         } else {
  //           // show score
  //           $('.answer-form').find('input').attr('disabled', 'disabled');
  //           $('.score-summary').append("<p>You got " + score + " out of " + qlength + " questions correct.</p>")
  //         }
  //       });

  //   });
  // }

  // var playQuiz = function (quiz_id, n, score) {

  //   $.get("/quizzes/" + quiz_id + "/questions", function (data) {

  //     $('#questions-container').empty();

  //     var qlength = data.length

  //     var view = {
  //       answer: data[n].answer,
  //       choices: data[n].choices.split(";"),
  //       question: data[n].question,
  //       question_type: data[n].question_type,
  //       template: _.template($(".quiz-question").html())
  //     }

  //     $('#questions-container').append(view.template());

  //     checkAnswer(quiz_id, data[n].id, n, score, qlength);

  //   });

  // };


  // showQuizzes();



  // // listener

  // $('#quiz-select').find('.target').change(function () {
  //   // 
  //   var quiz_id = $("select option:selected").data('quiz-id');
  //   $('#questions-container').empty();

  //   // start quiz
  //   playQuiz(quiz_id, 0, 0);
  // });

});


