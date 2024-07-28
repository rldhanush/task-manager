require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authenticate = require('./middlewares/authenticator');

const app = express();

app.use(bodyParser.json());
app.use(cors());

//Authentication routes
app.use('/api/auth', authRoutes);
//Tasks routes
app.use('/api/tasks',authenticate ,taskRoutes);


const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
