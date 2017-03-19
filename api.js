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
  getImage: function(term , index) {

    var url = 'https://www.googleapis.com/customsearch/v1?q='+term+'&key='+keys.key+'&cx='+keys.cx+'&num=10&start='+index+'&searchType=image';
    return axios.get(url).then(function (res) {
      let result = imageReducer(res.data.items);
      return result;
    }, function(res) {
      throw new Error('unable to fetch');
    });
  }
};



// 3 - get a list of most recent submitted searches
// is this list it will have when and the term
