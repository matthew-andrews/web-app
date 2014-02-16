module.exports = indexedDB;

/**
 * External dependencies
 */

var Q = require('q');

/**
 * Local variables
 */

var db;
var IndexedDB;

/**
 * IndexedDB Layer
 */

function indexedDB(opts) {
  var deferred = Q.defer();

  opts = opts || {};
  opts.name = opts.name || "APPDATA";
  // Protect ourselves inside old browsers
  try {
    IndexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    IDBTransaction = window.hasOwnProperty('webkitIndexedDB') ? window.webkitIDBTransaction : window.IDBTransaction;
    IDBKeyRange = window.hasOwnProperty('webkitIndexedDB') ? window.webkitIDBKeyRange : window.IDBKeyRange;
  } catch (e) {
    deferred.reject(e);
  }

  var version = 1,
  request = IndexedDB.open(opts.name, version);

  function installModels() {
    if (db.objectStoreNames.contains("articles")) {
      db.deleteObjectStore("articles");
    }

    // TODO This is strictly model logic, and ought not live inside the IndexedDB library, should move.
    db.createObjectStore("articles", { keyPath: "id" });
  }

  request.onsuccess = function(event) {
    var setVersionRequest;
    db = event.target.result;
    version = String(version);
    if (db.setVersion && version !== db.version) {
      setVersionRequest = db.setVersion(version);
      setVersionRequest.onsuccess = function(event) {
        installModels();
        setVersionRequest.result.oncomplete = function() {
          deferred.resolve();
        };
      };

    } else {
      deferred.resolve();
    }
  };

  request.onupgradeneeded = function(event) {
    db = event.target.result;
    installModels();
  };

  request.onerror = deferred.reject;
  return deferred.promise;
}

indexedDB.clear = function(model) {
  var deferred = Q.defer();
  var transaction = db.transaction([model], IDBTransaction.READ_WRITE || 'readwrite');
  var store = transaction.objectStore(model);
  var request = store.clear();
  transaction.onerror = deferred.reject;
  request.onerror = deferred.reject;
  request.onsuccess = deferred.resolve;
  return deferred.promise;
};

indexedDB.insert = function(model, data) {
  var deferred = Q.defer();
  var transaction = db.transaction([model], IDBTransaction.READ_WRITE || 'readwrite');
  transaction.onerror = deferred.reject;

  var store = transaction.objectStore(model);
  var total = data.length;

  function successCallbackInner() {
    total--;
    if (total === 0) deferred.resolve();
  }

  data.map(function(item) {
    var request = store.add(item);
    request.onsuccess = successCallbackInner;
    request.onerror = deferred.reject;
  });

  return deferred.promise;
};

indexedDB.getAll = function(model) {
  var deferred = Q.defer();
  var transaction = db.transaction([model], IDBTransaction.READ_ONLY || 'readonly');
  var store = transaction.objectStore(model);
  var request = store.openCursor();
  var results = [];
  transaction.onerror = deferred.reject;
  request.onerror = deferred.reject;

  request.onsuccess = function (event) {
    var result = event.target.result;

    // When result is null the end is reached
    if (result) {
      results.push(result.value);

      // Weird to hack jslint
      result.continue();
    } else {
      deferred.resolve(results);
    }
  };
  return deferred.promise;
};

indexedDB.get = function(model, id) {
  if (!id) return indexedDB.getAll(model);
  var deferred = Q.defer();
  var transaction = db.transaction([model], IDBTransaction.READ_WRITE || 'readwrite');
  var store = transaction.objectStore(model);
  var request = store.get(id);
  transaction.onerror = deferred.reject;
  request.onerror = deferred.reject;
  request.onsuccess = function(event) {
    var result = event.target.result;
    deferred.resolve(result);
  };
  return deferred.promise;
};
