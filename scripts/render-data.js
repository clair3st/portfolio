//define global variables
var articlesArray = [];

//define object constructor to store data in
function Article(opts) {
  this.country = opts.country;
  this.continent = opts.continent;
  this.firstVisit = opts.firstVisit;
  this.body = opts.body;
}

//define a method to render article information to DOM
Article.prototype.toHtml = function() {
  var source = $('#article-template').html();
  var template = Handlebars.compile(source);
  //display date as a relative number of 'days ago':
  this.firstVisit = parseInt((new Date() - new Date(this.firstVisit)) / 60 / 60 / 24 / 1000);
  return template(this);
};

//sort data by date first visited
sourceData.sort(function(a,b) {
  return (new Date(b.firstVisit)) - (new Date(a.firstVisit));
});

//add to our global array variable
sourceData.forEach(function(ele){
  articlesArray.push(new Article(ele));
});

//append to the DOM
articlesArray.forEach(function(article) {
  $('#articles-section').append(article.toHtml());
});
