"use client";

import {
  Typography,
  Stack,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Chip,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DashboardLayout from "@/app/components/DashboardLayout";
import { useState } from "react";

// Mock employees
const employees = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
];

// Initial mock task list
const initialTasks = [
  {
    id: 1,
    title: "Finish frontend UI",
    description: "Design the dashboard and employee forms.",
    assignedTo: [1, 2],
    status: "Pending",
    deadline: "2025-06-15",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");
  const [selectedEmployees, setSelectedEmployees] = useState<typeof employees>(
    []
  );

  const [filterEmployee, setFilterEmployee] = useState(0); // 0 = All
  const [filterStatus, setFilterStatus] = useState(""); // empty = All

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setDeadline("");
    setStatus("Pending");
    setSelectedEmployees([]);
    setEditingTaskId(null);
  };

  const openSnackbar = (message: string) => {
    setSnackbarMsg(message);
    setShowSnackbar(true);
  };

  const handleCreateOrUpdateTask = () => {
    const employeeIds = selectedEmployees.map((e) => e.id);

    if (editingTaskId !== null) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTaskId
            ? {
                ...t,
                title,
                description: desc,
                deadline,
                status,
                assignedTo: employeeIds,
              }
            : t
        )
      );
      openSnackbar("Task updated successfully.");
    } else {
      // Create new task
      const newTask = {
        id: tasks.length + 1,
        title,
        description: desc,
        assignedTo: employeeIds,
        deadline,
        status,
      };
      setTasks([...tasks, newTask]);
      openSnackbar("Task assigned successfully.");
    }

    setOpen(false);
    resetForm();
  };

  const editTask = (task: any) => {
    setTitle(task.title);
    setDesc(task.description);
    setDeadline(task.deadline);
    setStatus(task.status);
    setSelectedEmployees(
      employees.filter((e) => task.assignedTo.includes(e.id))
    );
    setEditingTaskId(task.id);
    setOpen(true);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    openSnackbar("Task deleted.");
  };

  return (
    <DashboardLayout>
      <Stack direction='row' spacing={2} sx={{ mb: 3 }}>
        <Select
          value={filterEmployee}
          onChange={(e) => setFilterEmployee(Number(e.target.value))}
          displayEmpty
          sx={{ minWidth: 200 }}>
          <MenuItem value={0}>All Employees</MenuItem>
          {employees.map((emp) => (
            <MenuItem key={emp.id} value={emp.id}>
              {emp.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}>
          <MenuItem value=''>All Statuses</MenuItem>
          <MenuItem value='Pending'>Pending</MenuItem>
          <MenuItem value='In Progress'>In Progress</MenuItem>
          <MenuItem value='Completed'>Completed</MenuItem>
        </Select>
      </Stack>

      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 3 }}>
        <Typography variant='h4'>Tasks</Typography>
        <Button
          variant='contained'
          onClick={() => {
            resetForm();
            setOpen(true);
          }}>
          Assign Task
        </Button>
      </Stack>

      {tasks
        .filter((task) => {
          const matchesEmployee =
            filterEmployee === 0 || task.assignedTo.includes(filterEmployee);
          const matchesStatus =
            filterStatus === "" || task.status === filterStatus;
          return matchesEmployee && matchesStatus;
        })
        .map((task) => (
          <Paper key={task.id} sx={{ p: 2, mb: 2 }}>
            <Stack direction='row' justifyContent='space-between'>
              <Stack spacing={1}>
                <Typography variant='h6'>{task.title}</Typography>
                <Typography variant='body2'>{task.description}</Typography>
                <Typography variant='body2'>
                  <strong>Status:</strong> {task.status} |{" "}
                  <strong>Deadline:</strong> {task.deadline}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Assigned to:{" "}
                  {task.assignedTo
                    .map(
                      (id) =>
                        employees.find((e) => e.id === id)?.name || "Unknown"
                    )
                    .join(", ")}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1}>
                <IconButton onClick={() => editTask(task)}>
                  <Edit />
                </IconButton>
                <IconButton color='error' onClick={() => deleteTask(task.id)}>
                  <Delete />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        ))}

      {/* Create/Edit Task Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='sm'
        fullWidth>
        <DialogTitle>
          {editingTaskId ? "Edit Task" : "Assign New Task"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label='Task Title'
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label='Description'
              fullWidth
              multiline
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <TextField
              label='Deadline'
              type='date'
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              displayEmpty>
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='In Progress'>In Progress</MenuItem>
              <MenuItem value='Completed'>Completed</MenuItem>
            </Select>
            <Autocomplete
              multiple
              options={employees}
              getOptionLabel={(option) => option.name}
              value={selectedEmployees}
              onChange={(_, value) => setSelectedEmployees(value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    key={option.id}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label='Assign to' />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleCreateOrUpdateTask}>
            {editingTaskId ? "Update" : "Assign"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity='success'
          sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}
