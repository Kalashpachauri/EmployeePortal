const { validateEmail, validatePhoneNumber } = require('../utils/validators');
const { v4: uuidv4 } = require('uuid');

class Employee {
    constructor(data) {
        this.id = data.id || uuidv4();
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.phone = data.phone;
        this.position = data.position;
        this.department = data.department;        
    }

    validate() {
        const errors = [];

        // Required fields
        if (!this.firstName) errors.push('First name is required');
        if (!this.lastName) errors.push('Last name is required');
        if (!this.email) errors.push('Email is required');
        if (!this.phone) errors.push('Phone number is required');
        if (!this.position) errors.push('Position is required');
        if (!this.department) errors.push('Department is required');

        // Format validation
        if (this.email && !validateEmail(this.email)) {
            errors.push('Invalid email format');
        }

        if (this.phone && !validatePhoneNumber(this.phone)) {
            errors.push('Invalid phone number format');
        }

        return errors;
    }
}

module.exports = Employee;