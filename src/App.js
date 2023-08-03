import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/Login";
import Layout from "./components/Layout";
import TodoList from "./components/TodoList";
import SignUp from "./components/Signup";
import { ProtectedRoute } from "./components/ProtectedRoute";

const routers = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/todo",
        element: (
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: "#70b43c", // green
      contrastText: "#ffffff", // white
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routers} />
    </ThemeProvider>
  );
}

export default App;
