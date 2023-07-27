import * as React from "react";
import Button from "@mui/material/Button";
import "./App.css";
import { getAllStudents } from "./client.js";

function App() {
  getAllStudents()
    .then(res => res.json())
    .then(console.log);

  return (
    <div className="App">
      <Button variant="contained">Hello World!</Button>
    </div>
  );
}

export default App;
