"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import DashboardLayout from "@/app/components/DashboardLayout";
import EmployeeLayout from "@/app/components/EmployeeLayout";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
};

const initialTasks: Task[] = [
  { id: 1, title: "Prepare report", description: "Q2 performance", status: "To Do" },
  { id: 2, title: "Client follow-up", description: "Email Acme Corp", status: "In Progress" },
  { id: 3, title: "Update profile", description: "Review and update info", status: "Completed" },
];

export default function EmployeeTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load initial tasks (simulate fetch)
  useEffect(() => {
    setTasks(initialTasks); // Replace with localStorage or API later
  }, []);

  const handleStatusChange = (taskId: number, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <EmployeeLayout>
      <Stack spacing={3}>
        <Typography variant="h5">My Tasks</Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={task.status}
                        label="Status"
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value as Task["status"])
                        }
                      >
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Stack>
    </EmployeeLayout>
  );
}

