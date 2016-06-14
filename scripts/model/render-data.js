(function (module) {
//define object constructor to store data in
  function Article (opts) {
    for (keys in opts) {
      this[keys] = opts[keys];
    }
  }
  Article.arrayAll = [];

  //define a method to render article information to DOM
  Article.prototype.toHtml = function() {
    var source = $('#article-template').html();
    var template = Handlebars.compile(source);
    //display date as a relative number of 'days ago':
    this.firstVisit = parseInt((new Date() - new Date(this.firstVisit)) / 60 / 60 / 24 / 1000);
    return template(this);
  };

  //sort data by date first visited
  Article.loadAll = function(dataWePassIn) {
    dataWePassIn.sort(function(a,b) {
      return (new Date(b.firstVisit)) - (new Date(a.firstVisit));
    }).forEach(function(ele){
      Article.arrayAll.push(new Article(ele));
    });
  };

  //append to the DOM
  Article.fetchAll = function(nextFunction){
    if (localStorage.pageData) {
      $ajax({
        type: 'HEAD',
        url: '/data/data.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Article.getAll(nextFunction);
          } else {
            Article.loadAll(JSON.parse(localStorage.pageData));
            nextFunction();
          }
        }
      });
    } else {
      Article.getAll(nextFunction);
    }
  };

  Article.getAll = function(nextFunction) {
    $.getJSON('/data/data.json', function(data) {
      Article.loadAll(data);
      localStorage.pageData = JSON.stringify(data);
      nextFunction();
    });
  };

  module.Article = Article;

})(window);
