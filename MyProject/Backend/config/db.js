const fs = require('fs');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '../database/database.json');

// Initialize database if it doesn't exist
const initializeDatabase = () => {
  try {
    if (!fs.existsSync(path.dirname(dbPath))) {
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    }
    
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify({ employees: [] }, null, 2), 'utf8');
      console.log('Database file created successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Read database
const readDatabase = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { employees: [] };
  }
};

// Write to database
const writeDatabase = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
};

module.exports = {
  initializeDatabase, readDatabase, writeDatabase
};