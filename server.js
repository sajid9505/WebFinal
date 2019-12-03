var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

// var mongo = require('mongodb')

var mongoose = require('mongoose')

var db, uri = "mongodb+srv://sajid9505:mongoDBatlas@cluster0-ebrcf.mongodb.net/test"

mongoose.connect(uri, 
    {useNewUrlParser:true, useUnifiedTopology: true })
    mongoose.connection.on('connected', function(){
          console.log("connected")
    });
mongoose.connection.on('error', function(err){
    console.log('Could not connect to MongoDB')
})



// mongo.MongoClient.connect(uri, 
//     {useNewUrlParser:true, useUnifiedTopology: true }, 
//     function(err, client){
//         if(err){
//             console.log('Could not connect to MongoDB')
//         }else{
//             db = client.db('test')
//         }
//     })

//  var save = function(form_data){
//     db.createCollection('task', function(err, collection){})
//     var collection = db.collection('task')
//     collection.save(form_data)
// }  



app.use(bodyParser.urlencoded({extended:true}))
require('./routes/task.routes')(app)
let task = []

require('./routes/task.routes')(app)


app.get('/', function(request, response){
  response.sendFile(__dirname+'/views/index.html')
})

app.get('/singleview', function(request, response){
  response.sendFile(__dirname+'/views/Singleview.html')
})

  server.listen(3000, 'localhost', function(){
    console.log('Server running');
  });