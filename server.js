var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000, //sets a port to be able to listen to
  app = express();

var proxyGitHub = function(request, response) {
  console.log('routing gitHub request for', request.params[0]);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    headers: {Authorization: 'token ' + process.env.GITHUB_TOKEN}
  }))(request, response);
};

app.get('/github/*', proxyGitHub);

app.use(express.static('./')); //serving up initial content

app.get('*', function(request, response){ //any url get acess to request and response obj
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
