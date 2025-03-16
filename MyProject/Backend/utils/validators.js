const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhoneNumber = (phone) => {
    // This regex allows formats like: 123-456-7890, (123) 456-7890, 123.456.7890, etc.
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegex.test(phone);
};

module.exports = {
    validateEmail,
    validatePhoneNumber
};