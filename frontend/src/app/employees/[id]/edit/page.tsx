"use client";

import DashboardLayout from "@/app/components/DashboardLayout";
import EmployeeForm from "@/app/components/EmployeeForm";
import { useRouter, useParams } from "next/navigation";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

// mock get employee by ID
const mockEmployee = {
  name: "Alice Johnson",
  email: "alice@example.com",
  position: "Developer",
};

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [employee, setEmployee] = useState<typeof mockEmployee | null>(null);

  useEffect(() => {
    // Fetch employee by id from backend
    setEmployee(mockEmployee); // replace with real API later
  }, [id]);

  const handleUpdate = (data: typeof mockEmployee) => {
    console.log("Update employee", id, data);
    // TODO: send to backend
    router.push("/employees");
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Edit Employee
      </Typography>
      {employee && <EmployeeForm initialData={employee} onSubmit={handleUpdate} />}
    </DashboardLayout>
  );
}
