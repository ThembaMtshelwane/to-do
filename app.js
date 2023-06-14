const express = require('express')
const mongoose =  require('mongoose')
const taskRoutes = require('./routes/taskRoutes')

const PORT = 3000

// express app
const app = express()

// connect to mongoDB
mongoose.connect(process.env.DB._URI)
  .then(()=>{
    // listen for requests
    app.listen(process.env.PORT)
  })
  .catch((err)=>{console.log(err)
})

// register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public'))
app.use(express.static('modules'))
app.use(express.urlencoded({extended:true}))

//Home Page
app.get('/', (req,res)=>{
  res.send("<p>Show animation</p> <a href='/dashbaord'>Dash</a>")
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
app.use('/tasks',taskRoutes)


// Page not found
app.use((req,res)=>{
    res.status(404).render('404')
})