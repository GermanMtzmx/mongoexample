const MongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectId;

const SERVER_ADDR = 'mongodb://localhost:27017';
const DATABASE = 'mongoexample';

const SERVER_ERROR = {
  status: 500,
  data: { message: 'Mongodb connection error ...'}
};

const get = function(dbCollection) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(SERVER_ADDR, (server_err, client) => {
      if (server_err !== null){
        reject(SERVER_ERROR);
      };
      const db = client.db(DATABASE);

      db.collection(dbCollection).find({}).toArray( (findErr, documents) => {
        if (findErr !== null) {
          reject({status: 400, data:{ message: 'Error to find documents'}});
          client.close()
        };

        resolve({
          status: 200,
          data: documents
        });
        client.close();
      });
    });
  });
}

const post = function(dbCollection, data) {
  return new Promise((resolve,reject) => {
    MongoClient.connect(SERVER_ADDR, (err, client) => {
      if (err !== null){
        reject(SERVER_ERROR); }

        const db = client.db(DATABASE);
        db.collection(dbCollection).insert(data, (insertErr, result) => {
          if (insertErr !== null ){
            reject({
              status: 400,
              data: { message: 'Error to save in database'}
            });
            client.close();
          }

          resolve({
            status: 201,
            data: result.ops[0]
          });
          client.close();
        });

    });

  });}

const put = function(dbCollection,userId, data) {
  return new Promise( (resolve, reject) => {

    MongoClient.connect(SERVER_ADDR, (err, client)=> {
      if(err !== null) {
        reject(SERVER_ERROR);
      };
      const db = client.db(DATABASE);

      db.collection(dbCollection).updateOne({_id: new objectID(userId) }, { $set: data },
      (updateErr, result) => {
        if(updateErr !== null ){
          reject({
            status: 400,
            data: { message: 'Unable to update user ...'}
          });
          client.close();
        };
        resolve({status: 200, data: null});
        client.close();
      });
    });

  });}

const deleteById = function(dbCollection, userId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(SERVER_ADDR, (server_err, client) => {
        if(server_err !== null) {
          reject(SERVER_ERROR);
        };

        const db = client.db(DATABASE);
        db.collection(dbCollection).deleteOne({ _id: new objectID(userId) }, (delete_err, result) => {
          if(delete_err !== null) { reject(
            {status: 404, data: {message: 'Unable to delete or not found'}})
            client.close();
          };

          resolve({status: 204, data: { message: 'User deleted.'}});
          client.close();
        });
    });
  });
}

const findById = function(dbCollection,userId) {

  return new Promise((resolve, reject) => {
    MongoClient.connect(SERVER_ADDR, (err, client) => {
      if(err !== null ){
        reject(SERVER_ERROR);
      };
      const db = client.db(DATABASE);
      db.collection(dbCollection).findOne({ _id: new objectID(userId) }, (findErr, result) => {
        if(findErr !== null || result === null){
          reject({status: 404, data: { message: 'User not found '}});
          client.close();
        };
        console.log(result)
        resolve({
          status: 200,
          data: result});

        client.close();

      });
    });
  });}

module.exports = {
  get,
  post,
  put,
  delete:deleteById,
  findById,
};
