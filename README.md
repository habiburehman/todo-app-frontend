# Todo App Frontend

React frontend for the Todo application. It supports signup, login, and Todo CRUD operations for authenticated users.

## Tech Stack

- React 18
- React Router v6
- Material UI (MUI)
- Axios

## Features

- User signup and login screens
- JWT token stored in `localStorage`
- Protected Todo route (`/todo`)
- Create, read, update, and delete todos
- Logout from top navigation

## Prerequisites

- Node.js 18+ and npm
- Backend running at `http://localhost:8080`

This frontend currently calls:

- `http://localhost:8080/api/v1/auth` in `src/components/Login.jsx`
- `http://localhost:8080/api/v1/todo` in `src/components/TodoList.jsx`

If your backend runs on a different host/port, update these URLs.

## Run Locally

From `todo-app-frontend`:

```powershell
npm install
npm start
```

Frontend starts on `http://localhost:3000`.

## Routes

- `/signup` - register user
- `/login` - login user
- `/todo` - protected todo page

## Scripts

- `npm start` - run development server
- `npm test` - run tests
- `npm run build` - build production bundle
