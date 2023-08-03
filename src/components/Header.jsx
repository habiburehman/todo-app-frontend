import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log("token=", token);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spring Boot Project
          </Typography>
          {token ? (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
