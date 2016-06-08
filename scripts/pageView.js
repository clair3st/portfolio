var pageView = {};

pageView.handleMainNav = function () {
  $('.main-nav').on('click','.tab', function() {
    $('.tab-content').hide();
    var val = $(this).attr('data-content');
    $('#' + val).fadeIn();
  });
};

pageView.handleMainNav();
