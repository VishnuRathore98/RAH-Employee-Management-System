"use client";

import { useParams } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";
import { Typography, Paper, Stack } from "@mui/material";

// Mock employee data
const allEmployees = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", position: "Developer" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", position: "Designer" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", position: "Manager" },
];

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = Number(params.id); // id from URL
  const employee = allEmployees.find((e) => e.id === id);

  if (!employee) {
    return (
      <DashboardLayout>
        <Typography variant="h5">Employee not found</Typography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography><strong>Name:</strong> {employee.name}</Typography>
          <Typography><strong>Email:</strong> {employee.email}</Typography>
          <Typography><strong>Position:</strong> {employee.position}</Typography>
          <Typography><strong>ID:</strong> {employee.id}</Typography>
        </Stack>
      </Paper>
    </DashboardLayout>
  );
}
