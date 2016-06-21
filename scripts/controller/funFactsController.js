(function(module) {
  var funFactsController = {};

  funFactsController.index = function() {
    $('.tab-content').hide();
    $('#funFacts').fadeIn();
  };

  module.funFactsController = funFactsController;
})(window);
