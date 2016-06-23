(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('ajax-spinner').hide();
    $('.tab-content').hide();
    $('#about').fadeIn();
  };

  module.aboutController = aboutController;
})(window);
