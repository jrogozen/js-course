var api_key = "4b83a81db074e4385c7ae966a82ab726";


$.get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + api_key, function(data){

  // loop through api results
  $.each(data.results, function(index, value) {

    if (value.poster_path === null || value.poster_path === "") {
      value.poster_path = "http://placehold.it/185x264";
    } else {
      value.poster_path = "https://image.tmdb.org/t/p/w185/" + value.poster_path;
    }

    var source = $("#movie-post-template").html();
    var template = Handlebars.compile(source);

    html = $(template(value));
    $('#now-playing').prepend(html);
  });

  // slidify
  $('#now-playing').slick({
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
     {
       breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
     },
     {
      breakpoint: 925,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
     },
     {
      breakpoint: 740,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
     },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
     }
    ]
  });

  $('.slick-slider').find('button').focus(function(){
    this.blur();
  });

})


$(document).on("click", ".view-movie", function(){
  // CHANGE
  var id = $(this).parent().data('id');
  $(document).trigger("movieView", [id]);

});

$(document).on("movieView", function(event, id){
  showMovie(id);
});

// funcky funcs
var showMovie = function(id){
  $('.view-movie-container').empty();
  // new get request based on id

  $.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + api_key, function(data){
    // console.log(data);

    if (data.poster_path === null || data.poster_path === "") {
      data.poster_path = "http://placehold.it/376x537";
    } else {
      data.poster_path = "https://image.tmdb.org/t/p/w396/" + data.poster_path;
    }

    data.release_date = data.release_date.split('-')[0];

    if (data.tagline === null) {
      data.tagline = "";
    }

    var source = $("#movie-detailed-post-template").html();
    var template = Handlebars.compile(source);

    html = $(template(data));

    (html).prependTo('.view-movie-container').show(400, "linear");

    if (data.vote_average === 0) {
      $('.view-movie-container').find('.votes').append('<li>no rating yet</li>');
    } else {
      for (var i = 0; i < Math.round(data.vote_average); i++ ) {
        $('.view-movie-container').find('.votes').append('<li class="fa fa-star gold"></li>');
      }
    }

  });

  $.get('https://api.themoviedb.org/3/movie/' + id + '/videos' + '?api_key=' + api_key, function(video_data){

    if (video_data.results.length > 0) {
      var source = $("#movie-video").html();

      var template = Handlebars.compile(source);

      html = $(template(video_data.results[0]));

      $('.view-movie-container').find('.video-container').append(html);
    }

  });

  $('html, body').animate({
    scrollTop: $('#main-view').offset().top
  }, 1000);

};

var listNowPlaying = function() {
  $.get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + api_key, function(data){

    $('#now-playing-list').prepend('<h5>Now Playing</h5>');

    // loop through api results
    $.each(data.results, function(index, value) {

      var source = $("#movie-list-template").html();
      var template = Handlebars.compile(source);

      html = $(template(value));
      $('#now-playing-list').find('.movie-list').prepend(html);

      // limit return to 10
      return index < 9;

    });

  })

};

var listUpcoming = function() {
  $.get('https://api.themoviedb.org/3/movie/upcoming?api_key=' + api_key, function(data){

    $('#upcoming-list').prepend('<h5>Upcoming</h5>');

    // loop through api results
    $.each(data.results, function(index, value) {

      var source = $("#movie-list-template").html();
      var template = Handlebars.compile(source);

      html = $(template(value));
      $('#upcoming-list').find('.movie-list').prepend(html);

      // limit return to 10
      return index < 9;

    });

  })
};

var listPopular = function() {
  $.get('https://api.themoviedb.org/3/movie/popular?api_key=' + api_key, function(data){

    $('#popular-list').prepend('<h5>Popular</h5>');

    // loop through api results
    $.each(data.results, function(index, value) {

      var source = $("#movie-list-template").html();
      var template = Handlebars.compile(source);

      html = $(template(value));
      $('#popular-list').find('.movie-list').prepend(html);

      // limit return to 10
      return index < 9;

    });

  })
}

var getGenres = function() {
  $.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key, function(data){

    $.each(data, function(key, value) {
      $.each(value, function(index, genre){
        var source = $("#movie-genres").html();
        var template = Handlebars.compile(source);

        html = $(template(genre));
        $('#genre-dropdown').append(html);

      });
    });

  });
};


$('#genre-dropdown').on("click", "li a", function(event){
  event.preventDefault();
  var genreId = $(this).data('genre-id');
  $(document).trigger('filterGenre', [genreId]);
});

$(document).on("filterGenre", function(event, data){
  showGenre(data);
});

var cleanMovie = function(data) {
  if (data.poster_path === null || data.poster_path === "") {
    data.poster_path = "http://placehold.it/376x537";
  } else {
    data.poster_path = "https://image.tmdb.org/t/p/w396/" + data.poster_path;
  }

  data.release_date = data.release_date.split('-')[0];

  if (data.tagline === null) {
    data.tagline = "";
  }

  return data;
}

var showGenre = function(id) {
  $.get('https://api.themoviedb.org/3/discover/movie?api_key=' + api_key + '&with_genres=' + id, function(data){

    $('#discover-content').find('#filtered-list').empty();   
    $.each(data.results, function(index, value){
      value = cleanMovie(value);

      var source = $('#filtered-movies').html();
      var template = Handlebars.compile(source);

      html = $(template(value));
      $('#discover-content').find('#filtered-list').append(html);
    });

  });
};

// random stuffs
$('button').on('focus', function(){
  this.blur();
});


// search stuff
$('.search').find('input').on("focus", function(){
  $(this).val('');
});

$('.search').find('input').bind("keypress", function(event) {
  if(event.which === 13) {
    event.preventDefault;
    searchTitle($(this).val());
  }
});

var searchTitle = function(title){
  $.get('https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=' + title, function(data){
    $('.search-results-container ul').empty();
    $.each(data.results, function(index, value){

      var value = cleanMovie(value);

        var source = $('#search-results').html();
        var template = Handlebars.compile(source);

        html = $(template(value));
        $('.search').find('.search-results-container ul').append(html).show();  
    
    });
  });
};

$('.search-results-container').on("click", ".view-movie", function(){
  console.log($(this));
  $(this).closest('ul').empty().hide();
});

// document ready
$(document).ready(function(){

  listNowPlaying();
  listUpcoming();
  listPopular();
  getGenres();
  showGenre(35);

});


