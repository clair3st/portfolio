(function(module) {
  var repoView = {};
  var repoCompiler = function(repo) {
    var template = Handlebars.compile($('#repo-template').text());
    return template(repo);
  };

  repoView.renderRepos = function() {
    $('#about ul').empty().append(
      repos.withTheAttribute('name')
      .map(repoCompiler)
    );
  };
  repos.requestRepos(repoView.renderRepos);

  module.repoView = repoView;

})(window);
