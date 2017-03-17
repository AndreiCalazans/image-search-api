var axios = require('axios');

var keys = {
  key:'AIzaSyCiHIhj8oL1gb8g2ABlR8Ynh6q0fGlnNjE',
  cx: '003708712258437730856:vwoluufrl7c'
};

var imageReducer = function(data) {
 var newData = data.map(function(each) {
  return {
    image: each.link,
    page: each.image.contextLink,
    text: each.snippet
  };
});
return newData;
};


module.exports = {
  getImage: function(term) {
    var url = 'https://www.googleapis.com/customsearch/v1?q='+term+'&key='+keys.key+'&cx='+keys.cx+'&num=10&searchType=image';
    return axios.get(url).then(function (res) {
      let result = imageReducer(res.data.items);
      return result;
    }, function(res) {
      throw new Error('unable to fetch');
    });
  }
};

//
// 1 - when /nameofImage
// the fetch must return this
// image url
// alt text
// page url
// 2 - ?offset=2
// this will make the api skip pages
//
// 3 - get a list of most recent submitted searches
// is this list it will have when and the term
