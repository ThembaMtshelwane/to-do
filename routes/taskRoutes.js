const express = require('express')
const router = express.Router()
const Task = require('../models/tasks')

//Go to create task form
router.get('/create', (req,res)=>{
    res.render('create')
})
// Get all tasks

router.get('/active', (req,res)=>{
    Task.find().sort({createdAt:-1})
     .then((result)=>{
        res.render('active',{tasks:result})
     })
     .catch((err)=>{console.log(err)})
})

router.get('/previous', (req,res)=>{
    Task.find().sort({createdAt:-1})
     .then((result)=>{
        res.render('previous',{tasks:result})
     })
     .catch((err)=>{console.log(err)})
})

// Create a task
router.post('/', (req,res)=>{
    const task = new Task(req.body)
    task.save()
     .then((result)=>{
       res.redirect('/tasks/active')
     })
    .catch((err)=>{console.log(err)})
})

//Get a specific task
router.get('/:id', (req,res)=>{
    const id = req.params.id
    Task.findById(id)
     .then((result)=>{
        res.render('details',{taskInfo:result})
     })
     .catch((err)=>{console.log(err)})
})

// Delete a specific task
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
});


module.exports = router

