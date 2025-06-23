"use client";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

// This would be replaced with the actual employee's ID from auth/session
const currentEmployeeId = 1;

// Mock data — in real setup, fetch this from backend
const mockAllocations = [
  {
    id: 101,
    employeeId: 1,
    item: "Laptop",
    serialNumber: "LAP12345",
    issueDate: "2024-12-01",
    expectedReturnDate: "2025-12-01",
    condition: "New",
  },
  {
    id: 102,
    employeeId: 1,
    item: "ID Card",
    serialNumber: "ID-AJ-001",
    issueDate: "2024-12-01",
    expectedReturnDate: "",
    condition: "Good",
  },
  {
    id: 103,
    employeeId: 2,
    item: "Monitor",
    serialNumber: "MON999",
    issueDate: "2024-11-15",
    expectedReturnDate: "",
    condition: "New",
  },
];

export default function EmployeeAssets() {
  const [myAllocations, setMyAllocations] = useState<typeof mockAllocations>([]);

  useEffect(() => {
    const filtered = mockAllocations.filter((a) => a.employeeId === currentEmployeeId);
    setMyAllocations(filtered);
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Allocated Items
      </Typography>

      {myAllocations.length === 0 ? (
        <Typography>No items currently allocated to you.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Expected Return</TableCell>
                <TableCell>Condition</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myAllocations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.serialNumber}</TableCell>
                  <TableCell>{item.issueDate}</TableCell>
                  <TableCell>{item.expectedReturnDate || "-"}</TableCell>
                  <TableCell>{item.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
