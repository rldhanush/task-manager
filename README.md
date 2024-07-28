
# Simple Task Manager

This project is a task management application with a backend built using Express.js and Firebase, and a frontend using React, react-beautiful-dnd for drag-and-drop functionality, axios for API calls, and node-fetch for server-side requests. The application supports Google login and signup, and allows users to manage tasks across different columns.

## Table of Contents

- [Project Title](#project-title)
- [Table of Contents](#table-of-contents)
- [Backend](#backend)
  - [Setup](#setup)
  - [Controllers](#controllers)
    - [authController.js](#authcontrollerjs)
    - [taskController.js](#taskcontrollerjs)
  - [Routes](#routes)
  - [server.js](#serverjs)
  - [Dependencies](#dependencies)
- [Frontend](#frontend)
  - [Setup](#setup-1)
  - [Components](#components)
    - [Navbar](#navbar)
    - [Task](#task)
    - [Column](#column)
    - [SearchBar](#searchbar)
    - [Manager](#manager)
    - [EditTask](#edittask)
    - [ViewTaskDetails](#viewtaskdetails)
  - [Dependencies](#dependencies-1)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Backend

### Setup

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Run `npm install` to install dependencies.
4. Create a `.env` file and add your Firebase credentials.
5. Run `npm start` to start the server.

### Controllers

#### authController.js

Handles user authentication including signup, login, and logout.

- **Signup:** Creates a new user with Firebase Authentication and saves user data to Firestore.
- **Login:** Verifies user credentials, generates a JWT token, and returns the token.
- **Logout:** Signs out the user from Firebase Authentication.

#### taskController.js

Handles CRUD operations for tasks.

- **Create Task:** Adds a new task to the 'todo' column in Firestore.
- **Read Tasks:** Retrieves tasks from Firestore for a given user.
- **Update Task:** Updates task details or moves the task between columns.
- **Delete Task:** Deletes a task from Firestore.

### Routes

Defines the endpoints for authentication and task management.

- **Auth Routes:** `/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`
- **Task Routes:** `/api/tasks`, `/api/tasks/:id`

### server.js

Main entry point for the backend server. Sets up Express.js, connects to Firebase, and defines routes.

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});
\`\`\`

### Dependencies

- express
- cors
- body-parser
- firebase-admin
- jsonwebtoken

## Frontend

### Setup

1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the React application.

### Components

#### Navbar

Navigation bar that changes based on the page (login/signup on other pages, logout on the Manager page).

#### Task

Displays individual task details with options to edit, view details, and delete.

#### Column

Container for tasks within a specific column (TODO, IN PROGRESS, DONE). Supports drag-and-drop functionality.

#### SearchBar

Allows users to search and sort tasks.

#### Manager

Main page for managing tasks, includes the Navbar, Add Task button, SearchBar, and Columns for tasks.

#### EditTask

Modal for editing task details.

#### ViewTaskDetails

Modal for viewing task details.

### Dependencies

- react
- react-dom
- react-router-dom
- axios
- react-beautiful-dnd

## Usage

1. Register or login using the provided forms.
2. Add, edit, view, or delete tasks.
3. Drag and drop tasks between columns.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
