(function(module) {
  var pageView = {};

  pageView.handleMainNav = function () {
    $('.main-nav').on('click','.tab', function() {
      $('.tab-content').hide();
      $('#' + $(this).attr('data-content')).fadeIn();
    });
    $('.main-nav .tab:first').click();
  };

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

  pageView.renderIndexPage = function() {
    Country.arrayAll.forEach(function(a) {
      $('#articles-section').append(a.toHtml());
      var optionTag = '<option value="' + a.continent + '">' + a.continent + '</option>';
      if ($('#continent-filter option[value="' + a.continent + '"]').length === 0) {
        $('#continent-filter').append(optionTag);
      };
    });
    pageView.handleMainNav();
    pageView.handleContinentFilter();
    pageView.setTeasers();
  };

  Country.fetchAll(pageView.renderIndexPage);

  pageView.funFactsSection = function() {
    var template = Handlebars.compile($('#continentStats-template').html());

    Country.numWordsByContinent().forEach(function(stat) {
      $('.continent-stats').append(template(stat));
    });

    $('.countries').text(Country.arrayAll.length);
    $('.continents').text(Country.allContinents().length);
  };

  Country.fetchAll(pageView.funFactsSection);
  module.pageView = pageView;

})(window);
