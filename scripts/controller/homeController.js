(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('#home').show();
  };

  module.homeController = homeController;
})(window);
