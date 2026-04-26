const router = require('express').Router();
const { protect, authorize } = require('../../middleware/auth');
const { ROLES } = require('../../constant/roles');
const { listEmployees } = require('../user/user.controller');

// GET All Employees (Strictly Admin Only)
router.get(
    '/employees', 
    protect, 
    authorize(ROLES.ADMIN), 
    listEmployees
);

module.exports = router;
