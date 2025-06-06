"use client";

import { useRouter } from "next/navigation";
import { Button, Container, Typography, Stack, Paper } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Employee Management System
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Please select your role to continue.
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/employee")}
          >
            Employee Login
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push("/admin")}
          >
            Admin Login
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
