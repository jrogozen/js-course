var AllQuestionsView = function(el) {
  this.el = el;
  var template = $('.question-template').html();
  this.templateFunc = _.template(template);
  var view = this;
  this.questions = [];
  this.currentQuestion = 0;

  $(document).on("displayQuestion", function(e, questions_array) {
    view.questions = questions_array;

    //render question,
    view.render(questions_array[currentQuestion]);

    //callbacks (trigger checkanswer);
    view.setCallbacks();
  });

  $(document).on("resultForQuestion", function(e) {
    //trigger next question
    this.currentQuestion ++;
    view.render(this.questions[this.currentQuestion]);
  });
};

AllQuestionView.prototype.render = function(question) {
  var html = this.templateFunc(question);
  $(this.el).prepend(html);
};

AllQuestionView.prototype.setCallbacks = function() {
  $('.questions-form').on("submit", function(e) {
    e.preventDefault();

    // send choice to controller
    var answer = $(this).find('input[type="radio"]:checked').val();

    $(document).trigger('checkAnswer', answer, n);
    // this.questionIndex += 1;
    // this.render(this.questions[this.questionIndex]);
  });
};


