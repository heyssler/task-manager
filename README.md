# Task Manager (Flask + React)

## 1. Running the app

Before running the app, make sure to have Node and Python3 on your machine. I have node v21.7.3, and python3 v3.12.2.

### Backend

`cd backend/`
`python3 -m venv venv`
`. venv/bin/activate`
`pip3 install -r requirements.txt`
`python3 run.py`

The API should now be available at http://localhost:5000.

### Frontend

`cd frontend/`
`npm install`
`npm start`

The React UI should now be available at http://localhost:3000.

## 2. Features

In addition to the required features:

- Display a list of tasks.
- Add a new task.
- Delete a task.
- Mark a task as completed.

I've also included:

- Sorting (by title or completed status).
- Unit tests (for both the backend and frontend).

## 3. Running Unit Tests

### Backend

`cd backend/`
`pytest`

### Frontend

`cd frontend/`
`npm test`

## 4. Basic Architecture

### Backend

##### Entrypoint

The entrypoint for the backend is `run.py`, which creates the application from the `__init__` instance method.

This creates the base Flask application, creates a SQLite table for the tasks, and registers the main API route.

##### Routing

Since this is a very basic application, only the 'Tasks' table is needed, as well as the 'Tasks' routes, which are found under `controllers/tasks.py`

`tasks.py` is a basic RESTful API pattern, which includes all the basic CRUD operations one would expect for the Tasks table. Note that it is wrapped in a function `register_routes` for additional modularity, and easier routing to the base application.

##### Tests

Tests are available under `tests/test_tasks.py` This leverages the same `create_app` method found in the instance method of the application, but passes in a different table configuration name to not conflict with the main database. It includes both positive and negative tests for the basic CRUD operations.

### Frontend

##### Entrypoint

`index.js` is the entrypoint, while `App.js` is the root component. `App.js` includes the main driving component, `TaskManager`, and not much else. By keeping the root component simple, the application becomes more scalable for future use cases.

##### Components

The application consists of 3 main components, found under `src/components/`

- Task.jsx
  - Individual attributes of 'Tasks' coming in from the API are handled here
  - The 'Delete' button and 'Completed' check box are included. This is to tightly couple these functions to each Task, for better data management.
- TaskList.jsx
  - This is essentially a collection of 'Tasks'.
  - This component is necessary to do large operations across all Tasks, for example, sorting.
  - It also acts as a middle man that sends function data between the tasks and the main manager component.
- TaskManager.jsx
  - This is where the bulk of the logic exists, as well as how the states, both for the tasks themselves and the sorting logic, are stored.
  - The API calls are all handled in this component, using just simple JS fetches. The 'tasks' state gets updated between each API call.
  - The data and functions, including sorting options, are propagated from this component down into its TaskList subcomponent.
  - This pattern allows the app state to be managed in one central location, and flow the data down to necessary components, for a cleaner data pipeline, and simpler logic.
