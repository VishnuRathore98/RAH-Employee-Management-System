"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";

// Mock employee list
const employees = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
];

// Allocation type
type Allocation = {
  id: number;
  employeeId: number;
  employeeName: string;
  item: string;
  serialNumber: string;
  issueDate: string;
  expectedReturnDate?: string;
  condition: string;
};

export default function AdminItemAllocation() {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    employeeId: "",
    item: "",
    serialNumber: "",
    issueDate: "",
    expectedReturnDate: "",
    condition: "",
  });

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => {
    setForm({
      employeeId: "",
      item: "",
      serialNumber: "",
      issueDate: "",
      expectedReturnDate: "",
      condition: "",
    });
    setOpenDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAllocate = () => {
    const employee = employees.find((e) => e.id.toString() === form.employeeId);
    if (!employee) return;

    const newAllocation: Allocation = {
      id: Date.now(),
      employeeId: employee.id,
      employeeName: employee.name,
      item: form.item,
      serialNumber: form.serialNumber,
      issueDate: form.issueDate,
      expectedReturnDate: form.expectedReturnDate,
      condition: form.condition,
    };

    setAllocations([...allocations, newAllocation]);
    handleClose();
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Item Allocation (Admin)
      </Typography>

      <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
        Allocate Item
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Expected Return</TableCell>
              <TableCell>Condition</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allocations.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.employeeName}</TableCell>
                <TableCell>{a.item}</TableCell>
                <TableCell>{a.serialNumber}</TableCell>
                <TableCell>{a.issueDate}</TableCell>
                <TableCell>{a.expectedReturnDate || "-"}</TableCell>
                <TableCell>{a.condition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Allocation Dialog */}
      <Dialog open={openDialog} onClose={handleClose} fullWidth>
        <DialogTitle>Allocate New Item</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              select
              label="Select Employee"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              fullWidth
              required
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Item Name"
              name="item"
              value={form.item}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Serial Number"
              name="serialNumber"
              value={form.serialNumber}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Issue Date"
              name="issueDate"
              type="date"
              value={form.issueDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              label="Expected Return Date"
              name="expectedReturnDate"
              type="date"
              value={form.expectedReturnDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Condition"
              name="condition"
              value={form.condition}
              onChange={handleChange}
              required
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAllocate}>
            Allocate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
