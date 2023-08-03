import React, { useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const url = "http://localhost:8080/api/v1/todo";

const TodoList = () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      const result = await axios.post(`${url}/task`, {
        description: inputValue,
      });
      if (result.data.id) {
        const tasksList = await axios.get(url);
        setTodos(tasksList.data);
      }
    }
    setInputValue("");
  };

  const deleteTask = async (id) => {
    const deletion = await axios.delete(`${url}/${id}`);
    if (deletion.status === 204) {
      const tasksList = await axios.get(url);
      setTodos(tasksList.data);
    }
  };

  const editTodo = (todo) => {
    const { id, description } = todo;
    setEditId(id);
    setEditValue(description);
  };

  const handleSaveEdit = async (id, description) => {
    const updatedTask = await axios.put(`${url}/${id}`, { description });
    if (updatedTask.status === 200) {
      const tasksList = await axios.get(url);
      setTodos(tasksList.data);
    }
    setEditId(null);
    setEditValue("");
  };

  React.useEffect(() => {
    axios.get(`${url}`).then((tasksList) => {
      setTodos(tasksList.data);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5%",
          flexFlow: "column",
        }}
      >
        <TextField
          label="Add Todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ marginRight: "1rem" }}
        />
        <Button
          variant="contained"
          onClick={handleAddTodo}
          style={{ marginTop: "1%" }}
        >
          Add
        </Button>
      </div>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index}>
            <ListItemText primary={todo.description} />
            <IconButton onClick={() => editTodo(todo)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteTask(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={editId !== null}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            label="Edit Todo"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditId(null)}>Cancel</Button>
          <Button onClick={() => handleSaveEdit(editId, editValue)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;
