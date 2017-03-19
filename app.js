var express =  require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const api = require('./api');
const favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
require('dotenv').config()
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ds041526.mlab.com:41526/image-search-terms')

const termSchema = new mongoose.Schema({
  term: String,
  createdAt: String
});

const Terms = mongoose.model('Terms', termSchema);


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
app.get('/history', function(req, res, next) {
  Terms.find({},{_id: 0, term:1, createdAt: 1} ,function(err , terms) {
    if (err) {
      return console.log(err);
    }
    terms.sort(function (a , b ) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.send(terms);
  })
});

app.get('/search/:term', function(req, res, next) {
  Terms(parseTerm(req.params.term)).save(); // save to database the term
  let index = Number(req.query.offset) > 1 ? Number(req.query.offset) *10 : 1;
  api.getImage(req.params.term , index).then(function(data) {
    res.send(data);
  });

});

app.listen(PORT, function() {
  console.log('server is up on port ' + PORT);
});


function parseTerm (term) {
  return {
    term: term,
    createdAt: new Date()
  }
};
