const { readDatabase, writeDatabase } = require('../config/db');
const Employee = require('../models/employee');

// Get all employees
const getAllEmployees = (req, res) => {
    const database = readDatabase();
    res.json(database.employees);
};

// Get employee by ID
const getEmployeeById = (req, res) => {
    const database = readDatabase();
    const employee = database.employees.find(emp => emp.id === req.params.id);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
};

// Post Employee
const createEmployee = (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        const validationErrors = newEmployee.validate();

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const database = readDatabase();

        // Check if email already exists
        const emailExists = database.employees.some(emp => emp.email === newEmployee.email);
        if (emailExists) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        database.employees.push(newEmployee);
        writeDatabase(database);

        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create employee' });
    }
};

// Update employee
const updateEmployee = (req, res) => {
    try {
        const database = readDatabase();
        const empIndex = database.employees.findIndex(emp => emp.id === req.params.id);

        if (empIndex === -1) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Create employee object with existing data and updates
        const updatedEmployee = new Employee({
            ...database.employees[empIndex],
            ...req.body,
            id: req.params.id // Ensure ID doesn't change
        });

        const validationErrors = updatedEmployee.validate();
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        // Check if updated email already exists with another employee
        const emailExists = database.employees.some(
            emp => emp.email === updatedEmployee.email && emp.id !== req.params.id
        );
        if (emailExists) {
            return res.status(400).json({ error: 'Email already in use by another employee' });
        }

        database.employees[empIndex] = updatedEmployee;
        writeDatabase(database);

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update employee' });
    }
};

// Delete employee
const deleteEmployee = (req, res) => {
    try {        
        const database = readDatabase();
        const empIndex = database.employees.findIndex(emp => emp.id === req.params.id);

        if (empIndex === -1) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const deletedEmployee = database.employees[empIndex];
        database.employees.splice(empIndex, 1);

        writeDatabase(database);
        res.status(200).json(deletedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};

module.exports = {
    getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee
};