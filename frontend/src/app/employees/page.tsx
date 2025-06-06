"use client";

import { useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";


// Mock employee data
const allEmployees = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", position: "Developer" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", position: "Designer" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", position: "Manager" },
];

export default function EmployeeListPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredEmployees = allEmployees.filter((emp) => {
    const query = search.toLowerCase();
    return (
      emp.name.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.id.toString() === query
    );
  });

  return (
    <DashboardLayout>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Employees</Typography>
        <Button component={Link} href={`/employees/new`} variant="contained">
          Add Employee
        </Button>
      </Stack>

      <TextField
        label="Search by ID, Name, or Email"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button size="small" component={Link} href={`/employees/${emp.id}`} variant="outlined">
                      View
                    </Button>
                    <Button size="small" component={Link} href={`/employees/${emp.id}/edit`} variant="contained">
                      Edit
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No matching employees.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}
