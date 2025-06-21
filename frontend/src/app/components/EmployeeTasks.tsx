"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

type Task = {
  id: number;
  title: string;
  description: string;
};

const mockTasks: Task[] = [
  { id: 1, title: "Design Landing Page", description: "Create responsive layout for marketing site" },
  { id: 2, title: "Bug Fixes", description: "Resolve open bugs assigned this sprint" },
];

export default function EmployeeTasks() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [uploads, setUploads] = useState<{
    [key: number]: { files: File[]; note: string };
  }>({});

  const handleOpenUpload = (taskId: number) => {
    setSelectedTaskId(taskId);
    setOpenDialog(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (selectedTaskId !== null) {
      setUploads((prev) => ({
        ...prev,
        [selectedTaskId]: {
          ...prev[selectedTaskId],
          files,
        },
      }));
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const note = e.target.value;
    if (selectedTaskId !== null) {
      setUploads((prev) => ({
        ...prev,
        [selectedTaskId]: {
          ...prev[selectedTaskId],
          note,
        },
      }));
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>

      <Stack spacing={2}>
        {mockTasks.map((task) => (
          <Paper key={task.id} sx={{ p: 2 }}>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {task.description}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleOpenUpload(task.id)}
              >
                Upload Work
              </Button>
              {uploads[task.id]?.files?.length > 0 && (
                <Typography variant="body2" color="success.main">
                  {uploads[task.id].files.length} file(s) uploaded
                </Typography>
              )}
            </Stack>
            {/* Thumbnail previews */}
            <Stack direction="row" spacing={1} mt={1}>
              {uploads[task.id]?.files?.map((file, idx) => (
                <Box key={idx} sx={{ width: 80, height: 80 }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>

      {/* Upload Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Upload Work Progress</DialogTitle>
        <DialogContent>
          <TextField
            label="Progress Note"
            fullWidth
            multiline
            rows={2}
            margin="normal"
            value={uploads[selectedTaskId!]?.note || ""}
            onChange={handleNoteChange}
          />
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
            Upload Image(s)
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </Button>
          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            {uploads[selectedTaskId!]?.files?.map((file, idx) => (
              <Box key={idx} sx={{ width: 80, height: 80 }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }}
                />
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
