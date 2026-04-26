const router = require('express').Router();
const { protect , authorize} = require('../../middleware/auth');
const { createTask, deleteTask, getAllTasks } = require('./task.controller');
const { createTaskValidator, taskIdValidator, updateTaskValidator } = require("./task.validate")
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

// router.post('/login', loginValidator,validate, login);
// router.post('/refresh', refreshToken);
// router.get('/me', protect, getMe);

module.exports = router; 
