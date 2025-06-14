"use client";

import {
  Paper,
  Typography,
  Avatar,
  Grid,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useRef, useState } from "react";

const mockEmployee = {
  name: "Alice Johnson",
  email: "alice@example.com",
  employeeId: "EMP-101",
  department: "Development",
  role: "Frontend Developer",
  joinDate: "2022-03-01",
  attendanceSummary: {
    totalDaysPresent: 18,
    lastCheckIn: "9:15 AM",
    lastCheckOut: "6:05 PM",
  },
  recentTasks: [
    { name: "Design Login Page", status: "Completed", timeSpent: "2h" },
    { name: "Fix Navbar Bug", status: "In Progress", timeSpent: "1.5h" },
  ],
};

export default function EmployeeProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 5 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Avatar
          src={avatarUrl ?? ""}
          sx={{ width: 80, height: 80 }}
        >
          {!avatarUrl && mockEmployee.name.charAt(0)}
        </Avatar>

        <div>
          <Typography variant="h5">{mockEmployee.name}</Typography>
          <Typography>{mockEmployee.role}</Typography>
          <Typography>{mockEmployee.email}</Typography>
        </div>

        <div>
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Photo
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </div>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Employee Info</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Employee ID" secondary={mockEmployee.employeeId} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Department" secondary={mockEmployee.department} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Date Joined" secondary={mockEmployee.joinDate} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Attendance Summary</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Total Days Present" secondary={mockEmployee.attendanceSummary.totalDaysPresent} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Check-in" secondary={mockEmployee.attendanceSummary.lastCheckIn} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Check-out" secondary={mockEmployee.attendanceSummary.lastCheckOut} />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" gutterBottom>
        Recent Tasks
      </Typography>
      <List dense>
        {mockEmployee.recentTasks.map((task, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={`${task.name} (${task.status})`}
              secondary={`Time Spent: ${task.timeSpent}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
