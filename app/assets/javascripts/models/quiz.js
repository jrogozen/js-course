var Quiz = function(data) {
  this.id = data.id;
  this.title = data.title;
};

Quiz.get = function(quizID) {
  $.ajax({
    url: "/quizzes/" + quizID,
    type: 'GET',
  })
    .done (function(data) {
      var quiz = new Quiz(data);
      $(document).trigger('displayQuiz', data);
    });
};

Quiz.fetch = function() {
  var quiz_array = [];

  $.ajax({
    url: "/quizzes",
    type: 'GET'
  })
    .done (function(data) {
      $.each(data, function(index, value) {
        quiz_array.push(new Quiz(value));
      });

      $(document).trigger('displayAllQuizzes', [quiz_array]);
    });
};

