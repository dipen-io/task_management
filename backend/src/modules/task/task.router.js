const router = require('express').Router();
const { protect , authorize} = require('../../middleware/auth');
const { updateTask, assignTask, createTask, deleteTask, getAllTasks, getSingleTask } = require('./task.controller');
const { assignTaskValidator, createTaskValidator, taskIdValidator, updateTaskValidator } = require("./task.validate")
const validate = require("../../middleware/input-validate");
const { ROLES } = require('../../constant/roles');

router.post('/create', protect, authorize(ROLES.ADMIN) , createTaskValidator, validate, createTask);
router.delete('/:id', protect, taskIdValidator, validate, deleteTask);
router.get(
    '/', 
    protect, 
    authorize(ROLES.ADMIN),
    getAllTasks
);

// GET Single Task (Admins & Assignees)
router.get(
    '/:id', 
    protect,
    taskIdValidator,
    validate,
    getSingleTask
);

// UPDATE Task (Smart Route for both Admins & Employees)
router.patch(
    '/:id', 
    protect, 
    taskIdValidator, 
    updateTaskValidator, 
    validate, 
    updateTask
);

// ASSIGN Task (Admin Only)
// in body Employees id
router.patch(
    '/:id/assign', 
    protect, 
    authorize(ROLES.ADMIN),
    assignTaskValidator, 
    validate, 
    assignTask
);



module.exports = router; 
