const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// GET all employees
router.get('/', employeeController.getAllEmployees);

// GET employee by ID
router.get('/:id', employeeController.getEmployeeById);

// POST new employee
router.post('/', employeeController.createEmployee);

// PUT update employee
router.put('/:id', employeeController.updateEmployee);

// DELETE employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;