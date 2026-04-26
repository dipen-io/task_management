const router = require('express').Router();
const { protect, authorize } = require('../../middleware/auth');
const { ROLES } = require('../../constants');
const { listEmployees } = require('../auth/auth.controller');

// GET All Employees (Strictly Admin Only)
router.get(
    '/employees', 
    protect, 
    authorize(ROLES.ADMIN), 
    listEmployees
);

module.exports = router;
