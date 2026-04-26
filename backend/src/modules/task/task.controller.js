const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const { create, remove, getAll, getOne, updateOne, assignOne } = require('./task.service');
const { HTTP_STATUS } = require("../../constant/httpStatus");

// creat task
const createTask = asyncHandler(async (req, res) => {
    const taskPayoad = {
        ...req.body,
        createdBy: req.user._id
    };

    const result = await create(taskPayoad);
    console.log("resulf", result);
    res.status(HTTP_STATUS.OK).json(new ApiResponse(201, "Task created successfully", result));
})


// delete task
const deleteTask= asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const user = req.user;
    await remove(taskId, user);
    res.status(HTTP_STATUS.OK).json(new ApiResponse(200, "Task deleted successfully", null));
})

// get all task by admin
const getAllTasks = asyncHandler(async (req, res) => {
    // Pass req.query so the service can read ?status=... or ?page=...
    const result = await getAll(req.query); 

    res.status(200).json(new ApiResponse(200, "Tasks retrieved successfully", result));
});

const getSingleTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const user  = req.user;

    const task = await getOne(taskId, user);
    const responsePayload = {
        accessedByRole: user.role, // Will be "Admin" or "Employee"
        accessedByName: user.name, // Bonus: literally tells you who!
        taskData: task
    };
    res.status(200).json(new ApiResponse(200, "Task retrieved successfully", responsePayload));
})

const updateTask = asyncHandler(async (req, res) => {
// Task update by admin only
// task status update by employee
    console.log("running..")
    const taskId = req.params.id;
    const updatePayload = req.body;
    const user = req.user;

    console.log("taskId", taskId);
    console.log("req.body", req.body);
    console.log("req.user",req.user);

    // Pass everything to our smart service
    const updatedTask = await updateOne(taskId, updatePayload, user);

    res.status(200).json(new ApiResponse(200, "Task updated successfully", updatedTask));
});

const assignTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    console.log("taskId",taskId)
    const { assignedTo } = req.body;
    console.log("assignedTo", assignedTo);

    // Pass them to the service
    const task = await assignOne(taskId, assignedTo);

    res.status(200).json(new ApiResponse(200, "Task assigned successfully", task));
});


module.exports = {
    createTask, deleteTask, getAllTasks, getSingleTask, updateTask, assignTask };

