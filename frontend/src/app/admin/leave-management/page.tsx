"use client";

import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// Mock employee leave data
interface LeaveRequest {
  id: string;
  employeeName: string;
  from: string;
  to: string;
  type: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialMockRequests: LeaveRequest[] = [
  {
    id: uuidv4(),
    employeeName: "Alice Johnson",
    from: "2025-06-01",
    to: "2025-06-03",
    type: "Vacation",
    reason: "Family trip",
    status: "Pending",
  },
  {
    id: uuidv4(),
    employeeName: "Bob Smith",
    from: "2025-06-02",
    to: "2025-06-04",
    type: "Sick",
    reason: "Fever",
    status: "Pending",
  },
];

export default function AdminLeavePage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialMockRequests);

  const updateStatus = (id: string, newStatus: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Leave Requests Management
      </Typography>

      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>{req.employeeName}</TableCell>
              <TableCell>{dayjs(req.from).format("YYYY-MM-DD")}</TableCell>
              <TableCell>{dayjs(req.to).format("YYYY-MM-DD")}</TableCell>
              <TableCell>{req.type}</TableCell>
              <TableCell>{req.reason}</TableCell>
              <TableCell>{req.status}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button
                    size="small"
                    color="success"
                    variant="contained"
                    disabled={req.status !== "Pending"}
                    onClick={() => updateStatus(req.id, "Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    disabled={req.status !== "Pending"}
                    onClick={() => updateStatus(req.id, "Rejected")}
                  >
                    Reject
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
