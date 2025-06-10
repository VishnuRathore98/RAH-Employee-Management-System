"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Stack,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function AttendancePage() {
  const [tasks, setTasks] = useState<{ name: string; timeSpent: number }[]>([]);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [submittedEntry, setSubmittedEntry] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [timeSpent, setTimeSpent] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const openTaskDialog = () => {
    setTaskName("");
    setTimeSpent("");
    setDialogOpen(true);
  };

  const handleAddTask = () => {
    const time = parseInt(timeSpent, 10);
    if (taskName && !isNaN(time) && time > 0) {
      setTasks((prev) => [...prev, { name: taskName, timeSpent: time }]);
      setDialogOpen(false);
    }
  };

  const handleCheckIn = () => {
    const time = new Date().toLocaleTimeString();
    setCheckInTime(time);
  };

  const handleCheckout = () => {
    if (tasks.length === 0) {
      // Prompt to add a task first
      openTaskDialog();
      return;
    }

    const now = new Date().toLocaleTimeString();

    const attendanceEntry = {
      employeeId: "E001",
      name: "Alice Johnson",
      date: today,
      checkIn: checkInTime,
      checkOut: now,
      tasks,
    };

    setCheckOutTime(now);
    setSubmittedEntry(attendanceEntry);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Employee Attendance
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2} direction="row" flexWrap="wrap" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckIn}
            disabled={!!checkInTime}
            startIcon={<AccessTimeIcon />}
          >
            {checkInTime ? `Checked in at ${checkInTime}` : "Check In"}
          </Button>

          <Button
            variant="outlined"
            onClick={openTaskDialog}
            disabled={!!checkOutTime}
            startIcon={<PlaylistAddIcon />}
          >
            Add Task
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleCheckout}
            disabled={!!checkOutTime}
            startIcon={<CheckCircleOutlineIcon />}
          >
            {checkOutTime ? `Checked out at ${checkOutTime}` : "Check Out"}
          </Button>
        </Stack>

        {tasks.length > 0 && (
          <Paper sx={{ mt: 3, p: 2, backgroundColor: "#f9f9f9" }}>
            <Typography variant="h6" gutterBottom>
              Tasks Added:
            </Typography>
            <List dense>
              {tasks.map((task, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={`${task.name} — ${task.timeSpent} min`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Paper>

      {submittedEntry && (
        <Paper elevation={4} sx={{ p: 3, backgroundColor: "#e3f2fd" }}>
          <Typography variant="h6" gutterBottom>
            ✅ Summary of Day's Work
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>Date: {submittedEntry.date}</Typography>
          <Typography>Employee: {submittedEntry.name} (ID: {submittedEntry.employeeId})</Typography>
          <Typography>Check-In: {submittedEntry.checkIn}</Typography>
          <Typography>Check-Out: {submittedEntry.checkOut}</Typography>

          <Typography sx={{ mt: 2 }} variant="subtitle1">
            Task Summary:
          </Typography>
          <List dense>
            {submittedEntry.tasks.map((task: any, i: number) => (
              <ListItem key={i}>
                <TaskAltIcon sx={{ mr: 1 }} />
                <ListItemText
                  primary={`${task.name} — ${task.timeSpent} min`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Task Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <TextField
            label="Task Name"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Time Spent (minutes)"
            type="number"
            fullWidth
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask} disabled={!taskName || !timeSpent}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
