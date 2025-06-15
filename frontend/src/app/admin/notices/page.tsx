"use client";

import {
  Typography,
  Paper,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

interface Notice {
  title: string;
  content: string;
  date: string;
}

export default function NoticeBoardPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [open, setOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.content) return;
    const notice: Notice = {
      ...newNotice,
      date: new Date().toLocaleString(),
    };
    setNotices((prev) => [notice, ...prev]);
    setNewNotice({ title: "", content: "" });
    setOpen(false);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Admin Notice Board</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Notice
        </Button>
      </Stack>

      {notices.length === 0 ? (
        <Typography>No announcements yet.</Typography>
      ) : (
        <List>
          {notices.map((notice, i) => (
            <ListItem key={i} divider>
              <ListItemText
                primary={notice.title}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">{notice.content}</Typography>
                    <Typography variant="caption" display="block">{notice.date}</Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Add Notice Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add New Announcement</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              fullWidth
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
            />
            <TextField
              label="Content"
              fullWidth
              multiline
              minRows={4}
              value={newNotice.content}
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddNotice} variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
