const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require();

const listEmployees = asyncHandler(async (req, res) => {
    const employees = await getAllEmployees(req.query);

    res.status(200).json(new ApiResponse(200, "Employees retrieved successfully", employees));
});

module.exports = { listEmployees };
