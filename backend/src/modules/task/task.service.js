const AppError = require("../../utils/AppError");
const Task = require("./task.model");


const create = async ( taskData ) => {
    const task = await Task.create(taskData);
    return task ;
};

const remove = async(taskId, user) => {
    console.log("taskId", taskId)
    const task = await Task.findById(taskId);
    console.log(task);
    if (!task) {
        throw new AppError("Task not found", 404);
    }
    const isAdmin = user.role === 'Admin';
    const isCreator = task.createdBy.toString() === user._id.toString();

    if (!isAdmin && !isCreator) {
        throw new AppError("You do not have permission to delete this task", 403);
    }

    await Task.findByIdAndDelete(taskId);
    
    return;
}

const getAll = async(query) => {

    const filter = {};

    // If the admin searches for a specific status (?status=completed)
    if (query.status) {
        filter.status = query.status;
    }
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name')      
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Task.countDocuments(filter);

    return {
        tasks,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
}

module.exports = { create, remove, getAll };

