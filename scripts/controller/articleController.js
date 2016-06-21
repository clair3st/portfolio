(function(module) {
  var articleController = {};

  articleController.index = function() {
    $('.tab-content').hide();
    $('#articles-section').fadeIn();
  };

  module.articleController = articleController;
})(window);
