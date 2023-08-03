import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { url } from "./Login";

export default function SignUp() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = await axios.post(`${url}/auth/signup`, {
      username: data.get("email"),
      password: data.get("password"),
    });
    if (result.status === 200) {
      navigate("/login");
    }
  };

  if (!token)
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Typography component="h5">
            Already have account{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              SignIn
            </Link>
          </Typography>
        </Box>
      </Container>
    );
  return <Navigate to="/todo" />;
}
