(function(module) {
  var repos = {};

  repos.allRepos = [];

  repos.requestRepos = function(callback) {
    $.get('/github/users/clair3st/repos' + '?per_page=10' + '&sort=updated')
    .done(function(data) {
      repos.allRepos = data;
    }).done(callback);
  };

  repos.withTheAttribute = function(myAttr) {
    return repos.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.repos = repos;
})(window);
