const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const { create, remove, getAll } = require('./task.service');
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

const getAllTasks = asyncHandler(async (req, res) => {
    // Pass req.query so the service can read ?status=... or ?page=...
    const result = await getAll(req.query); 

    res.status(200).json(new ApiResponse(200, "Tasks retrieved successfully", result));
});

module.exports = { createTask, deleteTask, getAllTasks };

module.exports = { createTask, deleteTask, getAllTasks }
