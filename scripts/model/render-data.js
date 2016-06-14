(function (module) {
//define object constructor to store data in
  function Country (opts) {
    console.log('opts ', opts);
    for (keys in opts) {
      this[keys] = opts[keys];
      console.log('this[keys] ', this[keys]);
      console.log('opts[keys] ', opts[keys]);
    }
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
    dataWePassIn.sort(function(a,b) {
      return (new Date(b.firstVisit)) - (new Date(a.firstVisit));
    }).forEach(function(ele){
      Country.arrayAll.push(new Country(ele));
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

  module.Country = Country;

})(window);
