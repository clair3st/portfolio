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
      $('artile').not('.template').show();
    }
  });
};

pageView.handleMainNav();
pageView.populateFilter();
pageView.handleContinentFilter();
