const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const apiKeyAuth = require('./middleware/apiKeyAuth');
const { initializeDatabase } = require('./config/db');
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/api', apiKeyAuth);

app.use('/api/employees', employeeRoutes);

initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});