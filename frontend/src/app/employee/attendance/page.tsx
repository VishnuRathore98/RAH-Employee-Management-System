"use client";

import { useState } from "react";
import {
  Typography,
  Button,
  Stack,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import DashboardLayout from "@/app/components/DashboardLayout";
import EmployeeLayout from "@/app/components/EmployeeLayout";

type AttendanceEntry = {
  date: string;
  checkIn?: string;
  checkOut?: string;
  tasks: string[];
};

export default function AttendancePage() {
  const today = dayjs().format("YYYY-MM-DD");
  const [history, setHistory] = useState<AttendanceEntry[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [newTask, setNewTask] = useState("");

  const showMessage = (msg: string) => {
    setSnackbar({ open: true, message: msg });
  };

  const todayEntry = history.find((h) => h.date === today);

  const handleCheckIn = () => {
    if (todayEntry?.checkIn) {
      return showMessage("Already checked in today");
    }

    const now = dayjs().format("HH:mm:ss");
    if (todayEntry) {
      todayEntry.checkIn = now;
      setHistory([...history]);
    } else {
      setHistory([{ date: today, checkIn: now, tasks: [] }, ...history]);
    }

    showMessage("Checked in at " + now);
  };

  const handleCheckOut = () => {
    if (!todayEntry?.checkIn) return showMessage("Please check in first");
    if (todayEntry.checkOut) return showMessage("Already checked out");
    if (!todayEntry.tasks || todayEntry.tasks.length === 0)
      return showMessage("Add at least one task before checking out");

    const now = dayjs().format("HH:mm:ss");
    todayEntry.checkOut = now;
    setHistory([...history]);
    showMessage("Checked out at " + now);
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    if (!todayEntry) {
      // Create entry if doesn't exist
      setHistory([{ date: today, tasks: [newTask], checkIn: undefined }, ...history]);
    } else {
      todayEntry.tasks.push(newTask.trim());
      setHistory([...history]);
    }
    setNewTask("");
  };

  return (
    <EmployeeLayout>
      <Paper sx={{ p: 4, maxWidth: 700, mx: "auto" }}>
        <Stack spacing={3}>
          <Typography variant="h5" textAlign="center">Attendance</Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" onClick={handleCheckIn}>Check In</Button>
            <Button variant="outlined" onClick={handleCheckOut}>Check Out</Button>
          </Stack>

          <Divider />

          <Typography variant="h6">Today's Tasks</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              label="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddTask}>Add</Button>
          </Stack>

          {todayEntry?.tasks?.length ? (
            <List dense>
              {todayEntry.tasks.map((task, i) => (
                <ListItem key={i}>
                  <ListItemText primary={task} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No tasks added yet.
            </Typography>
          )}

          <Divider />

          <Typography variant="h6">History</Typography>
          <List dense>
            {history.map((entry) => (
              <ListItem key={entry.date} divider>
                <ListItemText
                  primary={`${entry.date} — In: ${entry.checkIn || "—"} | Out: ${entry.checkOut || "—"}`}
                  secondary={`Tasks: ${entry.tasks.length}`}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </EmployeeLayout>
  );
}
