const express = require('express')
const PORT = 3000

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')

// listen for requests
app.listen(PORT)

// middleware and static files
app.user(express.static('public'))


//Home Page
app.get('/', (req,res)=>{
    res.render('index')
})

//  Dashboard Page
app.get('/dashbaord', (req,res)=>{
    res.render('dashbaord')
})

//About Page
app.get('/about', (req,res)=>{
    res.render('about')
})

//Create Task
app.get('/tasks/create', (req,res)=>{
    res.render('create')
})

// Page not found
app.use((req,res)=>{
    res.status(404).render('404')
})