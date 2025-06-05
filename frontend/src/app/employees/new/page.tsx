"use client";

import DashboardLayout from "@/app/components/DashboardLayout";
import EmployeeForm from "@/app/components/EmployeeForm";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";

export default function AddEmployeePage() {
  const router = useRouter();

  const handleAdd = (data: { name: string; email: string; position: string }) => {
    console.log("Create employee", data);
    // TODO: send to backend
    router.push("/employees");
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Add New Employee
      </Typography>
      <EmployeeForm onSubmit={handleAdd} />
    </DashboardLayout>
  );
}
