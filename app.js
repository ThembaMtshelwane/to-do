const express = require('express')
const mongoose =  require('mongoose')
const Task = require('./models/tasks')

const PORT = 3000

// express app
const app = express()

// connect to mongoDB
const dbURI = 'mongodb+srv://thembamm3:A4MJL4wQr3pGxCZD@cluster0.ughmouw.mongodb.net/todos?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then(()=>{
    // listen for requests
    app.listen(PORT)
  })
  .catch((err)=>{console.log(err)
})

// register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//Home Page
app.get('/', (req,res)=>{
  res.send('<p>Show animation</p>')
})

//  Dashboard Page
app.get('/dashbaord', (req,res)=>{
    res.render('dashbaord')
})

//About Page
app.get('/about', (req,res)=>{
    res.render('about')
})

/* ****** Tasks Routes ******/

//Go to create task form
app.get('/tasks/create', (req,res)=>{
    res.render('create')
})
// Get all tasks

app.get('/tasks/active', (req,res)=>{
    Task.find().sort({createdAt:-1})
     .then((result)=>{
        res.render('active',{tasks:result})
     })
     .catch((err)=>{console.log(err)})
})

app.get('/tasks/previous', (req,res)=>{
    Task.find().sort({createdAt:-1})
     .then((result)=>{
        res.render('previous',{tasks:result})
     })
     .catch((err)=>{console.log(err)})
})

// Create a task
app.post('/tasks', (req,res)=>{
    const task = new Task(req.body)
    task.save()
     .then((result)=>{
       res.redirect('/tasks/active')
     })
    .catch((err)=>{console.log(err)})
})

//Get a specific task
app.get('/tasks/:id', (req,res)=>{
    const id = req.params.id
    Task.findById(id)
     .then((result)=>{
        res.render('details',{taskInfo:result})
     })
     .catch((err)=>{console.log(err)})
})

// Delete a specific task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });



// Page not found
app.use((req,res)=>{
    res.status(404).render('404')
})