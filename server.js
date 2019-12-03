var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

var mongoose = require('mongoose')

var db, uri = "mongodb+srv://sajid9505:MongoDBatlas@cluster0-ebrcf.mongodb.net/testretryWrites=true&w=majority"

mongoose.connect(uri, 
    {useNewUrlParser:true, useUnifiedTopology: true })
    mongoose.connection.on('connected', function(){
          console.log("connected")
    });
mongoose.connection.on('error', function(err){
    console.log('Could not connect to MongoDB')
})

var Schema = mongoose.Schema
var taskSchema = new Schema(
  {
    Title: {
      type:String,
      required: "Name is required"
    },
    Notes:{
      type:String,
      required: "Note is required"
    },
    Priority:{
        type: Number,
        required: "Rating is required between 0 to 10"
    }
  }
)

var Task = mongoose.model('Task', taskSchema)


app.use(bodyParser.urlencoded({extended:true}))

app.post('/submit',function(request,response){
  let task = new Task(request.body)
  console.log(request.body)
  task.save(function(err,data){
    if(err){
        console.log(err)
          return response.status(400).json({msg:"Fields must be from 1-10 "})
    }
    response.status(200).json({task:data})
  })
  
 
}) 

  app.get('/',function(request,response){
    response.sendFile(__dirname+'/views/index.html')
  })

  app.get('/new/:index',function(request,response){
    if(request.params.index){
        //response.json(articles[request.params])
        //response.render('article.ejs',{article:articles[request.params.index]})
        Task.find({'_id': request.params.index},function(err,data){
          if(err){
            console.log(err)
            return response.status(400).json({msg:'No query'})
     
          }
          return response.render('singleview.ejs',{task:data[0]})
        })
      }
      else{
        return response.json({msg:"Task not found"})
      }
  })
  

  server.listen(3000, 'localhost', function(){
    console.log('Server running');
  });


  