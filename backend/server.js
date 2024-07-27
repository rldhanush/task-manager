require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

//Authentication routes
app.use('/api/auth', authRoutes);
//Tasks routes
app.use('/api/tasks', taskRoutes);


const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
