const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')

//Go to create task form
router.get('/create', taskController.task_get_form)

// Get all tasks
router.get('/active',  taskController.task_active)
router.get('/previous', taskController.task_previous)

// Create a task
router.post('/', taskController.task_create_post)

//Get a specific task
router.get('/:id', taskController.task_details)

// Delete a specific task
router.delete('/:id', taskController.task_delete);


module.exports = router

