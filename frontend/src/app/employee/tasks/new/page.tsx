"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

// Mock employee data (replace with API later)
const employees = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
];

export default function AdminTaskForm() {
  const [task, setTask] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [teamLead, setTeamLead] = useState("");

  const handleSubmit = () => {
    if (!task || !assignedTo || !teamLead) return;

    const newTask = {
      task,
      assignedTo,
      teamLead,
    };

    console.log("Task created:", newTask);
    // Later: send to backend
    setTask("");
    setAssignedTo("");
    setTeamLead("");
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Create New Task
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Task Description"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          fullWidth
          required
        />

        <TextField
          select
          label="Assign to Employee"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          fullWidth
          required
        >
          {employees.map((emp) => (
            <MenuItem key={emp.id} value={emp.name}>
              {emp.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Team Lead"
          value={teamLead}
          onChange={(e) => setTeamLead(e.target.value)}
          fullWidth
          required
        >
          {employees.map((emp) => (
            <MenuItem key={emp.id} value={emp.name}>
              {emp.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!task || !assignedTo || !teamLead}
        >
          Assign Task
        </Button>
      </Stack>
    </Paper>
  );
}
