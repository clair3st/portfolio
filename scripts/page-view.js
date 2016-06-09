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
      console.log(val);
    }
  });
};

pageView.handleMainNav();
pageView.populateFilter();
