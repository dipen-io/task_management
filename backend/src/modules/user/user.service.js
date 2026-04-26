const User = require("./user.model");

const getAllEmployees = async (query) => {
    const filter = { role: 'Employee' };

    if (query.search) {
        filter.$or = [
            { name: { $regex: query.search, $options: 'i' } },
            { email: { $regex: query.search, $options: 'i' } }
        ];
    }

    const employees = await User.find(filter)
        .select('-password -refreshToken') 
        .sort({ createdAt: -1 });

    return employees;
};

module.exports = { getAllEmployees };
