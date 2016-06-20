var express = require('express'),
  port = process.env.PORT || 3000, //sets a port to be able to listen to
  app = express();

app.use(express.static('./')); //serving up initial content

app.get('*', function(request, response){ //any url get acess to request and response obj
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
