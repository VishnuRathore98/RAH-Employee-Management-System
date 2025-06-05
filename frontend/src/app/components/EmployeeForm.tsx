"use client";

import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";

type EmployeeFormProps = {
  initialData?: {
    name: string;
    email: string;
    position: string;
  };
  onSubmit: (data: { name: string; email: string; position: string }) => void;
};

export default function EmployeeForm({ initialData, onSubmit }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <TextField
          required
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          required
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          required
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
}
