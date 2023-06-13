const Task = require('../models/tasks')


// Get all tasks controller
const task_active = (req,res)=>{
    Task.find().sort({createdAt:-1})
     .then((result)=>{
        res.render('tasks/active',{tasks:result})
     })
     .catch((err)=>{console.log(err)})
}

const task_previous = (req,res)=>{
    Task.find().sort({createdAt:-1})
    .then((result)=>{
       res.render('tasks/previous',{tasks:result})
    })
    .catch((err)=>{console.log(err)})
}

//Get a specific task controller
const task_details = (req,res)=>{
    const id = req.params.id
    Task.findById(id)
     .then((result)=>{
        res.render('tasks/details',{taskInfo:result})
     })
     .catch((err)=>{ res.status(404).render('404')})
}

//Go to create task form controller
const task_get_form= (req,res)=>{
    res.render('tasks/create')
}

// Create a task controller
const task_create_post= (req,res)=>{
    const task = new Task(req.body)
    task.save()
     .then((result)=>{
       res.redirect('/tasks/active')
     })
    .catch((err)=>{console.log(err)})
}

// Delete a task controller
const task_delete= (req,res)=>{
    const id = req.params.id;
    
    Task.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/tasks/active' });
      })
      .catch(err => {
        console.log(err);
      });
}



module.exports = {
    task_details,
    task_get_form,
    task_create_post,
    task_delete,
    task_active,
    task_previous
}