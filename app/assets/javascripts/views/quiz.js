var QuizView = function(el) {
  this.el = el;
  var template = $('.quiz-template').html();
  this.templateFunc = _.template(template);
  var view = this;

  $(document).on("displayQuiz", function(e, quiz) {
    view.render(quiz);
  });
};

var AllQuizzesView = function(el) {
  this.el = el;
  var template = $('.all-quizzes-template').html();
  this.templateFunc = _.template(template);
  var view = this;

  $(document).on('displayAllQuizzes', function(e, quiz_array) {
    $(el).empty()
    $.each(quiz_array, function(index, value) {
      view.render(value);
    });
    view.setCallbacks();
  });
}

QuizView.prototype.render = function(quiz) {
  var html = this.templateFunc(quiz);
  $(this.el).empty();
  $(this.el).prepend(html);
};

AllQuizzesView.prototype.setCallbacks = function() {
  $('.select-quiz-form').on("submit", function(e) {
    e.preventDefault();
    var quizID = $(this).find('select option:selected').data('quiz-id');

    $(document).trigger('quizSelected', quizID);
  });
};

AllQuizzesView.prototype.render = function(quiz) {
  var html = this.templateFunc(quiz);
  $(this.el).prepend(html);
}



