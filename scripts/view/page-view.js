(function(module) {
  var pageView = {};

  pageView.handleContinentFilter = function() {
    $('#continent-filter').on('change', function(){
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('article').not('.template').show();
      }
    });
  };

  pageView.setTeasers = function() {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click','.read-on', function(){
      console.log($(this).html());
      if ($(this).text() === 'Read on →') {
        $(this).prev().children().show();
        $(this).html('&larr; Show less');
      } else {
        $(this).prev().children('*:nth-of-type(n+2)').hide();
        $(this).html('Read on &rarr;');
      }
      return false;
    });
  };

  pageView.renderIndexPage = function() {
    $('#ajax-spinner').fadeOut();

    Country.arrayAll.forEach(function(a) {
      $('#articles-section').append(a.toHtml());
      var optionTag = '<option value="' + a.continent + '">' + a.continent + '</option>';
      if ($('#continent-filter option[value="' + a.continent + '"]').length === 0) {
        $('#continent-filter').append(optionTag);
      };
    });
    pageView.handleContinentFilter();
    pageView.setTeasers();
    pageView.funFactsSection();
  };

  pageView.funFactsSection = function() {
    var template = Handlebars.compile($('#continentStats-template').html());

    Country.numCountriesByContinent().forEach(function(cur) {
      $('.continent-stats').append(template(cur));
    });

    $('.countries').text(Country.arrayAll.length);
    $('.continents').text(Country.allContinents().length);
  };

  module.pageView = pageView;

})(window);
