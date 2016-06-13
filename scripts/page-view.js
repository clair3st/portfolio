var pageView = {};

pageView.handleMainNav = function () {
  $('.main-nav').on('click','.tab', function() {
    $('.tab-content').hide();
    var val = $(this).attr('data-content');
    $('#' + val).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

pageView.populateFilter = function() {
  $('article').not('.template').each(function() {
    var val = $(this).find('h2').text();
    var optionTag = '<option value="' + val + '">' + val + '</option>';
    if ($('#continent-filter option[value="' + val + '"]').length === 0) {
      $('#continent-filter').append(optionTag);
    }
  });
};

pageView.handleContinentFilter = function() {
  $('#continent-filter').on('change', function(){
    if ($(this).val()) {
      var val = $(this).val();
      $('article').hide();
      $('article[data-category="' + val + '"]').fadeIn();
    } else {
      $('article').not('.template').show();
    }
  });
};

pageView.setTeasers = function() {
  var $hiddenBody = $('.article-body *:nth-of-type(n+2)');
  $hiddenBody.hide();
  $('article').on('click','.read-on', function(){
    console.log($(this).html());
    if ($(this).html() === $('.read-on').html()) {
      $(this).prev().children().show();
      $(this).html('&larr; Show less');
    } else {
      $(this).prev().children('*:nth-of-type(n+2)').hide();
      $(this).html('Read on &rarr;');
    }
    return false;
  });
};

pageView.handleMainNav();
pageView.populateFilter();
pageView.handleContinentFilter();
pageView.setTeasers();
