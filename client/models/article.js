var superagent = require('superagent');
var Q = require('q');

function get(id) {
  var deferred = Q.defer();
  var url = '/api/article' + (id ? '/' + id : 's') + '.json';
  Q.nfcall(superagent.get, url)
    .then(function(res) {
      deferred.resolve(res.body);
    });
  return deferred.promise;
}

exports.get = function(id) {
  return get(id);
};
