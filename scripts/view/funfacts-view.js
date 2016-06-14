pageView.funFactsSection = function() {
  $('.countries').text(Country.arrayAll.length);
  console.log('countryarray ', Country.arrayAll);
};

Country.fetchAll(pageView.funFactsSection);
