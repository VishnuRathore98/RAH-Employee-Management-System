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
} from "@mui/material";
import DashboardLayout from "@/app/components/EmployeeLayout";

type AttendanceEntry = {
  date: string;
  checkIn?: string;
  checkOut?: string;
  tasks: string[];
};

// We'll simulate loading history from somewhere (e.g. shared state or localStorage)
export default function EmployeeHomePage() {
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
    <DashboardLayout>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Welcome Back 👋</Typography>

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
  );
}
