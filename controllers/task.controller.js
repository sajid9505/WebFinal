var Task = require('./../models/task.model')

module.exports.form = function(request, response){
    response.render('index.ejs')
}

module.exports.new = function(request, response){
    //save(request.body)
    let task = new Task(request.body)
    task.save(function(err, data){
        if(err){
            console.log(err)
            return response.status(400).json({msg: "All fields are required"})
        }
        return response.status(200).json({task:data})
    })
   // articles.push(request.body)
   // console.log(articles)
}

module.exports.read = function(request, response){
        Task.find({'_id':request.params.id}, 
          function(err, data){
            if(err){
                return response.status(400).json({msg: 'Could not query the db'})
            }
            console.log(data)
            return response.render('Singleview.ejs', {task:data[0]})
        })
}