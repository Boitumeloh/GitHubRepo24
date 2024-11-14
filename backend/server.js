const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUploadRoute = require('./routes/fileUpload');  // Import the file upload route
const policiesRouter = require('./routes/policies');

dotenv.config();
const app = express();

app.use(express.json()); // To handle JSON payloads
app.use(cors()); // Enable CORS
app.use('/api', policiesRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', fileUploadRoute); // Register the file upload route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));