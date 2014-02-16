var superagent = require('superagent');
var Q = require('q');
var indexeddb = require('../libs/indexeddb');

function download(id) {
  var deferred = Q.defer();
  var url = '/api/article' + (id ? '/' + id : 's') + '.json';
  Q.nfcall(superagent.get, url)
    .then(function(res) {
      if (res.text === 'offline') deferred.reject();
      else deferred.resolve(res.body);
    });
  return deferred.promise;
}

function get(id) {
  var deferred = Q.defer();
  indexeddb.get('articles', id)
    .then(deferred.resolve)
    .catch(function() {
      return download(id)
        .then(deferred.resolve)
        .catch(deferred.reject);
    });
  return deferred.promise;
}

function synchronize() {
  var articles;
  var deferred = Q.defer();
  download()
    .then(function(results) {
      articles = results;
      return indexeddb.clear('articles');
    })
    .then(function() {
      return indexeddb.insert('articles', articles);
    })
    .then(function() {
      deferred.resolve(articles);
    })
    .catch(deferred.reject);
  return deferred.promise;
}


module.exports = {
  get: get,
  synchronize: synchronize
};
