"use client";

import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

interface LeaveRequest {
  id: string;
  from: string;
  to: string;
  type: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function LeaveRequestPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!from || !to || !type || !reason) return alert("Fill all fields");
    const newRequest: LeaveRequest = {
      id: uuidv4(),
      from,
      to,
      type,
      reason,
      status: "Pending",
    };
    setRequests([...requests, newRequest]);
    setFrom("");
    setTo("");
    setType("");
    setReason("");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Leave Request
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Stack spacing={2}>
          <TextField
            type="date"
            label="From"
            InputLabelProps={{ shrink: true }}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <TextField
            type="date"
            label="To"
            InputLabelProps={{ shrink: true }}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="leave-type-label">Leave Type</InputLabel>
            <Select
              labelId="leave-type-label"
              value={type}
              label="Leave Type"
              onChange={(e: SelectChangeEvent) => setType(e.target.value)}
            >
              <MenuItem value="Sick">Sick</MenuItem>
              <MenuItem value="Vacation">Vacation</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
            </Select>
          </FormControl>
          <TextField
            multiline
            rows={3}
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit Leave Request
          </Button>
        </Stack>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Leave History
      </Typography>

      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>{dayjs(req.from).format("YYYY-MM-DD")}</TableCell>
              <TableCell>{dayjs(req.to).format("YYYY-MM-DD")}</TableCell>
              <TableCell>{req.type}</TableCell>
              <TableCell>{req.reason}</TableCell>
              <TableCell>{req.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
