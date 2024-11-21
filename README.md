# TaskVault

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation Guide](#installation-guide)
- [Usage Instructions](#usage-instructions)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
a secure and scalable Kanban board application designed for agile teams to manage tasks efficiently. Featuring user authentication with JSON Web Tokens (JWT), TaskVault ensures that all interactions remain secure and private.

## Technologies Used

- **Frontend**:
  - React.js
  - TypeScript
  - React Router
  - Axios for API requests
  - Styled Components / CSS (for styling)
  - JWT Authentication
  - Local Storage for session management

- **Backend**:
  - Node.js with Express.js
  - Sequelize ORM (for PostgreSQL)
  - PostgreSQL Database
  - JWT Authentication

## Features

- **User Authentication**:
  - Register, Login, and Logout functionality with JWT token-based authentication.
  - Secure routes for managing tickets (CRUD operations).

- **Kanban Board**:
  - Organize tasks in three states: **Todo**, **In Progress**, and **Done**.
  - Create and assign tasks with descriptions and deadlines.
  - Drag and drop tickets across states (if you choose to implement this).

- **Responsive Design**:
  - The app is mobile-friendly and adapts to different screen sizes.

- **CRUD Operations for Tickets**:
  - Users can create, view, edit, and delete tickets.
  - Each ticket has a name, status, and description.

- **Ticket Filtering**:
  - Tickets can be filtered based on their status (Todo, In Progress, Done).

## Installation Guide

### Prerequisites
Ensure you have the following installed:

- Node.js (v14 or above)
- PostgreSQL database

### Steps to Run Locally

1. **Clone the repository**
```bash
    git clone https://github.com/yourusername/kanban-board-app.git
    cd kanban-board-app
```

2. **Set up the backend (API)**
- Navigate to the [server] folder
- Create a [.env] file in the root of the server directory.
- Add your environment variable
```bash
    DB_NAME=kanban_db
    DB_USER=your_username
    DB_PASSWORD=your_password
    JWT_SECRET_KEY=your_jwt_secret_key
```
- Install backend dependencies
```bash
    cd server
    npm install
```

3. **Set up the frontend (React app)**
- Navigate to the client folder.
- Install frontend dependencies:
```bash
    cd server
    npm install
```

4. **Start the server**
From the server directory, run:
```bash
    npm start
```

5. **Start the client**
From the client directory, run:
```bash
    npm start
```

6. **Open the app in your browser**
Visit http://localhost:3000 to view the app in action.

## Usage Instructions
### Login:
- Upon opening the app, you will be prompted to log in using your username and password. After logging in, you can manage your tickets.
### Kanban Board:
- The Kanban board will display three swimlanes (Todo, In Progress, Done).
- You can drag and drop tasks between the columns (if implemented).
### Creating and Editing Tickets:
- Create new tickets by clicking on the "New Ticket" button.
- Edit tickets by selecting them from the board.

## API Endpoints
### Auth Routes
- POST /auth/login:
Login and obtain a JWT token.

### User Routes
- GET /api/users:
Retrieve all users (authentication required).

- GET /api/users/:
Retrieve user details by ID (authentication required).

- POST /api/users:
Create a new user (authentication required).

- PUT /api/users/:
Update user details by ID (authentication required).

- DELETE /api/users/:
Delete a user by ID (authentication required).

### Ticket Routes
- GET /api/tickets:
Retrieve all tickets (authentication required).

- GET /api/tickets/:
Retrieve a single ticket by ID (authentication required).

- POST /api/tickets:
Create a new ticket (authentication required).

- PUT /api/tickets/:
Update a ticket by ID (authentication required).

- DELETE /api/tickets/:
Delete a ticket by ID (authentication required).

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request from your fork to the main repository.

Please follow the code style and ensure that all tests pass before submitting a pull request..

## License

```bash
MIT License

Copyright (c) 2024 Henry Agustin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```