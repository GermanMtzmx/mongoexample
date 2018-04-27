# Example of mongodb CRUD api

Example of mongodb native driver for node js

## Get started


```sh
npm install
npm start
```

## fakeORM

Helpers to perform a crud in selected collection using native driver for mongodb in nodejs (all methods return a promise).

### Methods

* __get:__ method that receives a collection name.

* __post:__ method that receives a collection name and request data.

* __put:__ method that receives a collection name, document id, and data.

* __delete:__ method that receives a collection name and an document id.

* __getById:__ method that receives a collection name and an document id.

### Common use

__Example of get method__

```javascript
  const fakeORM = require('./fakeORM');

  fakeORM.get('collectionName').then(response => {
    console.log(response)
  }).catch(error => {
    console.log(err)
  })
```

The promise always return an object like this :

```javascript
 {
   code: 200 // status code for api by example 200,
   data: {...} // Object with data of operation
 }
```

__Example with express route__

```javascript
app.get('/users', (req, res) => {
  fakeORM.get('users').then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err => {
    res.status(err.status).send(err.data);
  });
});
```
