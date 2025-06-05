"use client";

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
} from "@mui/material";
import Link from "next/link";

// Mock employee data
const employees = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", position: "Developer" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", position: "Designer" },
];

export default function EmployeeListPage() {
  return (
    <DashboardLayout>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Employees</Typography>
        <Button variant="contained" component={Link} href="/employees/new">
          Add Employee
        </Button>
      </Stack>

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
            {employees.map((emp) => (
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
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}
