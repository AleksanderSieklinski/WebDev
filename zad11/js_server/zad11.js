const express = require('express');
const bodyParser= require('body-parser')
const mongodb = require('mongodb')
const cors = require('cors')
var db
const dbname = '1sieklinski';
const url = 'mongodb://1sieklinski:pass1sieklinski@172.20.44.25/1sieklinski';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
  
mongodb.MongoClient.connect(url, function(err, client) {
  if (err) return console.log(err)
  db = client.db(dbname);
  console.log('Connect OK');
})
// this method is used to register that the server is listening on port 7007
app.listen(7007,function() {
   console.log('listening on <7007>')
})
// this method is used to send a message to the client (browser) when the server is running
app.get('/', function(req,res) {
   console.log('app.get /')
  res.send('Aplikacja CRUD - node.js')
})
// this method is used to send a requested file (form.html) to the client (browser)
app.get('/form', function(req,res) {
   console.log('app.get /form')
  res.sendFile(__dirname + '/form.html')
})
// this method is used to insert a new student into the database
app.post('/stud', function( req,res ) {
   console.log(req.body)
   db.collection('stud').insertOne(req.body,function(err,result) {
      if (err) return console.log(err)
      console.log('Rekord dodany do bazy')
      res.end('{"inserted record":"'+result.insertedCount+'"}')
   })
})
// this method is used to get all students from the database and send them to the client (browser)
app.get('/stud', function(req, res) {
   console.log('app.get /stud')
  var cursor = db.collection('stud').find().toArray(function(err, results) {
     if (err) return console.log(err)
     res.end(JSON.stringify(results))
     console.log(results) 
  })
})
// this method is used to get a student by id from the database and send it to the client (browser)
app.get('/stud/:id', function(req,res) {
   console.log(req.params.id)
   db.collection('stud').findOne({_id: new mongodb.ObjectId(req.params.id)},function(err,result) {
       if (err) return console.log(err)
       res.end(JSON.stringify(result))
       console.log(result)
   })      
})
// this method is used to delete a student by id from the database
app.delete('/stud/:id',function(req, res) {
   console.log(req.params.id)
   db.collection('stud').deleteOne({_id: new mongodb.ObjectId(req.params.id)},function(err,result) {
      if (err) return console.log(err)
      console.log('Rekord usuniety z bazy - '+req.params.id)
      res.end('"Documents deleted ":"1"}')
   })
})
// this method is used to update a student by id in the database
app.put('/stud/:id',function(req,res) {
   console.log(req.params.id)
   console.log(req.body)    
   data = req.body
   db.collection('stud').updateOne({_id: new mongodb.ObjectId(req.params.id)},{ $set: data}, function(err,result) {
      if (err) return console.log(err)
      console.log('rekord poprawiony - '+req.params.id)
      console.log( result.modifiedCount )
      console.log( result.matchedCount )
      res.end('"Document updated ":"'+result.modifiedCount+'"}')
  })       
})