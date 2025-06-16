"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody, 
  Divider,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import DashboardLayout from "@/app/components/EmployeeLayout";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";



type AttendanceEntry = {
  date: string;
  checkIn?: string;
  checkOut?: string;
  tasks: string[];
};

// We'll simulate loading history from somewhere (e.g. shared state or localStorage)
export default function EmployeeHomePage() {

// ---------------------------------------------------------------------------

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


// ---------------------------------------------------------------------------



  const [history, setHistory] = useState<AttendanceEntry[]>([]);

  // Replace this with actual state sharing or localStorage in real usage
  useEffect(() => {
    const dummyHistory: AttendanceEntry[] = [
      {
        date: "2025-06-05",
        checkIn: "09:01:23",
        checkOut: "17:12:45",
        tasks: ["Follow-up client", "Write report"],
      },
      {
        date: "2025-06-04",
        checkIn: "09:05:00",
        checkOut: "17:00:00",
        tasks: ["Fix bugs", "Stand-up meeting"],
      },
    ];

    setHistory(dummyHistory);
  }, []);

  return (
    <>
    <DashboardLayout>
{/* ----------------------------------------------------------------------- */}

 <Container maxWidth="md" sx={{ mt: 4 }}>
 <Typography variant="h5">Welcome Back 👋</Typography>

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


{/* ----------------------------------------------------------------------- */}
      <Paper sx={{ p: 4 }}>
        <Stack spacing={3}>
         
          <Divider />
          <Typography variant="h6">Attendance & Task History</Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell>Tasks Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.date}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.checkIn || "—"}</TableCell>
                  <TableCell>{entry.checkOut || "—"}</TableCell>
                  <TableCell>
                    {entry.tasks.length > 0
                      ? entry.tasks.map((task, i) => <div key={i}>• {task}</div>)
                      : "No tasks"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </Paper>
    </DashboardLayout>
</>
  );
}
