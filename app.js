const express = require('express')
const mongoose =  require('mongoose')

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


//Home Page
app.get('/', (req,res)=>{
   res.redirect('/tasks')
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
//Create Task
app.get('/tasks/create', (req,res)=>{
    res.render('create')
})

// Get all tasks
app.get('/tasks', (req,res)=>{
    Task.find().sort({createdAt:-1})
     .then((result)=>{
        res.render('index',{tasks:result})
     })
     .catch((err)=>{console.log(err)})
})

// Page not found
app.use((req,res)=>{
    res.status(404).render('404')
})