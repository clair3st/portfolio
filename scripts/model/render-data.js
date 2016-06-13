function Article (opts) {
  for (keys in opts) {
    this[keys] = opts[keys];
  }
}
Article.all = [];
//define object constructor to store data in
// function Article(opts) {
//   this.country = opts.country;
//   this.continent = opts.continent;
//   this.firstVisit = opts.firstVisit;
//   this.body = opts.body;
// }

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
    Article.all.push(new Article(ele));
  });
};

//append to the DOM
Article.fetchAll = function(){
  if (localStorage.pageData) {
    var data = JSON.parse(localStorage.getItem('pageData'));
    Article.loadAll(data);
    pageView.renderIndexPage();
  } else {
    $.getJSON('../../data/data.json', function(data) {
      localStorage.setItem('pageData', JSON.stringify(data));
      Article.loadAll(data);
      pageView.renderIndexPage();
    });
  }
};
