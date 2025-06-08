"use client";

import { useState } from "react";
import {
  Typography,
  Button,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
} from "@mui/material";
import DashboardLayout from "@/app/components/DashboardLayout";
import dayjs from "dayjs";

type AttendanceEntry = {
  date: string;
  checkIn?: string;
  checkOut?: string;
};

export default function AttendancePage() {
  const today = dayjs().format("YYYY-MM-DD");
  const [history, setHistory] = useState<AttendanceEntry[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const showMessage = (msg: string) => {
    setSnackbar({ open: true, message: msg });
  };

  const handleCheckIn = () => {
    const existing = history.find((h) => h.date === today);
    if (existing?.checkIn) {
      return showMessage("Already checked in today");
    }

    const now = dayjs().format("HH:mm:ss");
    if (existing) {
      existing.checkIn = now;
      setHistory([...history]);
    } else {
      setHistory([{ date: today, checkIn: now }, ...history]);
    }

    showMessage("Checked in at " + now);
  };

  const handleCheckOut = () => {
    const existing = history.find((h) => h.date === today);
    if (!existing?.checkIn) {
      return showMessage("Please check in first");
    }
    if (existing.checkOut) {
      return showMessage("Already checked out");
    }

    const now = dayjs().format("HH:mm:ss");
    existing.checkOut = now;
    setHistory([...history]);

    showMessage("Checked out at " + now);
  };

  return (
    <DashboardLayout>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Stack spacing={3}>
          <Typography variant="h5" textAlign="center">Attendance</Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" onClick={handleCheckIn}>Check In</Button>
            <Button variant="outlined" onClick={handleCheckOut}>Check Out</Button>
          </Stack>

          <Typography variant="h6">History</Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((entry) => (
                  <TableRow key={entry.date}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.checkIn || "—"}</TableCell>
                    <TableCell>{entry.checkOut || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </DashboardLayout>
  );
}
