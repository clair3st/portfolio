pageView.funFactsSection = function() {
  var template = Handlebars.compile($('#continentStats-template').html());

  Country.numWordsByContinent().forEach(function(stat) {
    $('.continent-stats').append(template(stat));
  });

  $('.countries').text(Country.arrayAll.length);
  $('.continents').text(Country.allContinents().length);
};

Country.fetchAll(pageView.funFactsSection);
