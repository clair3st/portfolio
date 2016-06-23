(function(module) {
  var projectController = {};

  projectController.index = function() {
    $('#ajax-spinner').hide();
    $('.tab-content').hide();
    $('#github-info').fadeIn();
  };

  module.projectController = projectController;
})(window);
