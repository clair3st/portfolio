// (function (module) {
// //object constructor to store data in
//   function Country (opts) {
//     Object.keys(opts).forEach(function(prop){
//       this[prop] = opts[prop];
//     },this);
//   }
//
//   Country.arrayAll = [];
//
//   //define a method to render article information to DOM
//   Country.prototype.toHtml = function() {
//     var source = $('#article-template').html();
//     var template = Handlebars.compile(source);
//     //display date as a relative number of 'days ago':
//     this.firstVisit = parseInt((new Date() - new Date(this.firstVisit)) / 60 / 60 / 24 / 1000);
//     return template(this);
//   };
//
//   //sort data by date first visited
//   Country.loadAll = function(dataWePassIn) {
//     Country.arrayAll = dataWePassIn.sort(function(a,b) {
//       return (new Date(b.firstVisit)) - (new Date(a.firstVisit));
//     }).map(function(ele){
//       return new Country(ele);
//     });
//   };
//
//   //append to the DOM
//   Country.fetchAll = function(){
//     if (localStorage.pageData) {
//       $.ajax({
//         type: 'HEAD',
//         url: '/data/data.json',
//         success: function(data, message, xhr) {
//           var eTag = xhr.getResponseHeader('eTag');
//           if (!localStorage.eTag || eTag !== localStorage.eTag) {
//             localStorage.eTag = eTag;
//             Country.getAll();
//           } else {
//             Country.loadAll(JSON.parse(localStorage.pageData));
//             pageView.renderIndexPage();
//           }
//         }
//       });
//     } else {
//       Country.getAll();
//     }
//   };
//
//   Country.fetchAll();
//   module.Country = Country;
//
// })(window);
