module.exports = function(app){
    var taskController = require('./../controllers/task.controller')
    
    app.get('/', taskController.form)
    app.post('/new_task', taskController.new)
    app.get('/task/:id', taskController.read)
    
}