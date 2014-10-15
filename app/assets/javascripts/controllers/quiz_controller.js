var QuizController = function () {

};

$(document).ready(function() {
  new QuizView('.quiz');
  // Quiz.get(1);

  new QuestionView('.quiz-question');

  new AllQuizzesView('.list-quizzes select');

  Quiz.fetch();

  Question.get(1, 0);

  // event listener for quiz select form submission
  $(document).on('quizSelected', function(e, quizID) {
    Quiz.get(quizID);
  });

  $(document).on('checkAnswer', function(e, answer, n) {
    // check answer

    // display result

    // show next question
    Question.get(1, n);

  });

});