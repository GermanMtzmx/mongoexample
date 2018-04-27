const app = require('express')();
const bodyParser = require('body-parser');
const fakeORM = require('./fakeORM');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res)=> res.send('HOLA MONGO :V'));

// ROUTES FOR USERS

app.get('/users', (req, res) => {
  fakeORM.get('users').then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err => {
    res.status(err.status).send(err.data);
  });
});

app.post('/users',(req, res) => {
  fakeORM.post('users',req.body).then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err => {
    res.status(err.status).send(err.data);
  });
});

app.get('/users/:id', (req, res) => {
  fakeORM.findById('users', req.params.id).then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err => {
    res.status(err.status).send(err.data);
  });
});

app.put('/users/:id', (req, res) => {
  fakeORM.put('users',req.params.id, req.body).then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err => {
    res.status(err.status).send(err.data);
  });
});

app.delete('/users/:id', (req, res) => {
  fakeORM.delete('users', req.params.id).then(
    result => {res.status(result.status).send(result.data);}
  ).catch(err => {
    res.status(err.status).send(err.data);
  });
});

app.listen(3000, ()=> console.log("App running under port 3000"));
