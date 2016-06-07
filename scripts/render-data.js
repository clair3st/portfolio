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
Article.prototype.toHtml = function(){
  var $newArticle = $('article.template').clone();
  // $newArticle.attr('data-category', this.continent);
  $newArticle.find('h1').html(this.country);
  $newArticle.find('h2').html(this.continent);
  $newArticle.find('time').attr('pubdate', this.firstVisit);
  $newArticle.find('.body-content').html(this.body);

  //display date as a relative number of 'days ago':
  $newArticle.find('time[pubdate]').attr('title', this.firstVisit);
  $newArticle.find('time').html('first visited about ' + parseInt((new Date() - new Date(this.firstVisit)) / 60 / 60 / 24 / 1000) + ' days ago');

  $newArticle.removeAttr('class');
  return $newArticle;
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
