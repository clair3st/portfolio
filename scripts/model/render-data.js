(function (module) {
//object constructor to store data in
  function Country (opts) {
    Object.keys(opts).forEach(function(prop){
      this[prop] = opts[prop];
    },this);
  }

  Country.arrayAll = [];

  //define a method to render article information to DOM
  Country.prototype.toHtml = function() {
    var source = $('#article-template').html();
    var template = Handlebars.compile(source);
    //display date as a relative number of 'days ago':
    this.firstVisit = parseInt((new Date() - new Date(this.firstVisit)) / 60 / 60 / 24 / 1000);
    return template(this);
  };

  //sort data by date first visited
  Country.loadAll = function(dataWePassIn) {
    Country.arrayAll = dataWePassIn.sort(function(a,b) {
      return (new Date(b.firstVisit)) - (new Date(a.firstVisit));
    }).map(function(ele){
      return new Country(ele);
    });
  };

  //append to the DOM
  Country.fetchAll = function(nextFunction){
    if (localStorage.pageData) {
      $.ajax({
        type: 'HEAD',
        url: '/data/data.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Country.getAll(nextFunction);
          } else {
            Country.loadAll(JSON.parse(localStorage.pageData));
            nextFunction();
          }
        }
      });
    } else {
      Country.getAll(nextFunction);
    }
  };

  Country.getAll = function(nextFunction) {
    $.getJSON('/data/data.json', function(data) {
      Country.loadAll(data);
      localStorage.pageData = JSON.stringify(data);
      nextFunction();
    });
  };

  Country.allContinents = function() {
    return Country.arrayAll.map(function(country){
      return country.continent;
    })
    .reduce(function(acc, cur) {
      if (!acc.includes(cur)) {
        acc.push(cur);
      };
      return acc;
    },[]);
  };

  Country.numCountriesByContinent = function(){
    return Country.allContinents().map(function(continent) {
      return {
        continent: continent,
        numCountries: Country.arrayAll.filter(function(curCountry){
          return curCountry.continent === continent;
        }).length
      };
    });
  };

  module.Country = Country;

})(window);
