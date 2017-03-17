var express =  require('express');
const app = express();
const path = require('path');

const api = require('./api');


const PORT  = process.env.PORT || 3000;

app.use(function(req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https'){
    res.redirect('http://'+ req.hostname + req.url);
  }else {
    next();
  }
});



app.get('/' , function(req, res, next) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/:term', function(req, res, next) {
  api.getImage(req.params.term).then(function(data) {
    res.send(data);
  });
  
});

app.listen(PORT, function() {
  console.log('server is up on port ' + PORT);
});
