const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');

const DepartmentController = require('../controllers/departments/department.controller');

const departmentsController = new DepartmentController();

router.get('/fetch-departments', authMiddleware.universalAccessMiddleware, departmentsController.fetchDepartments);


module.exports = router;