var Question = function(data) {
  this.id = data.id;
  this.question = data.question;
  this.answer = data.answer;
  this.timesAnswered = data.times_answered;
  this.correctAnswers = data.correct_answers;
  this.quizId = data.quiz_id;
  this.choices = data.choices.split(";");
  this.totalQuestionsCount = data.length;
};

Question.fetch = function(quizID) {
  var question_array = [];

  $.ajax({
    url: "/quizzes/" + quizID + "/questions",
    type: "GET"
  })
    .done (function(data) {
      $.each(data, function(index, value) {
        question_array.push(new Question(value));
      });

      $(document).trigger('displayQuestions', [question_array]);
    });
}

// Question.get = function(quizID, n) {
//   var question = "";

//   $.ajax({
//     url: "/quizzes/" + quizID + "/questions",
//     type: "GET"
//   })
//     .done(function(data) {
//       question = new Question(data[n]);

//       $(document).trigger('displayQuestion', question);
//     });
// }
