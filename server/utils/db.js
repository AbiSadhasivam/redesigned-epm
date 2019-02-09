const mongoClient = require("mongodb").MongoClient;
const q = require("q");

const config = require("../config.json");

let dbName = config.db.dbName;

function _createCollection(db, name) {
  var deferred = q.defer();

  db.createCollection(name, function(err, result) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });
  return deferred.promise;
}

function _checkCollectionExists(db) {
  db = db.db(dbName);
  let collectionList = ["employee"],
    isAvailable = true,
    promiseArr = [];
  db.listCollections().toArray(function(err, items) {
    let collections = items;
    for (let collectionName of collectionList) {
      if (collections.indexOf(collectionName) === -1) {
        var deferred = q.defer();
        promiseArr.push(_createCollection(db, collectionName));
      }
    }
  });
  return q
    .all(promiseArr)
    .then(function() {
      console.log("Created Collections");
    })
    .catch(function(err) {
      console.log("Error in creating the collection");
    });
}

function connectToMongoServer(callback) {
  var mongoURL = config.db.URL.replace("{dbName}", dbName);
  mongoClient.connect(mongoURL, function(err, db) {
    if (err) {
      callback({
        isError: true,
        data: err.message
      });
    } else {
      // TODO : Code cleanup here
      _checkCollectionExists();
    }
  });
}

module.exports = {
  connectToMongoServer: connectToMongoServer
};
