"use client";

import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";

interface Notice {
  title: string;
  content: string;
  date: string;
  id: string; // unique id to track read status
}

const allNotices: Notice[] = [
  {
    id: "1",
    title: "Team Outing on Friday",
    content: "All employees are invited for a team outing at 4:00 PM this Friday.",
    date: "June 4, 2025 10:30 AM",
  },
  {
    id: "2",
    title: "Quarterly Review",
    content: "Quarterly reviews will be conducted between June 10-15. Please be prepared.",
    date: "June 1, 2025 09:00 AM",
  },
];

export default function EmployeeNoticesPage() {
  const [readNotices, setReadNotices] = useState<string[]>([]);

  const handleMarkAsRead = (id: string) => {
    if (!readNotices.includes(id)) {
      setReadNotices((prev) => [...prev, id]);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Announcements & Notices
      </Typography>

      {allNotices.length === 0 ? (
        <Typography>No announcements to show.</Typography>
      ) : (
        <List>
          {allNotices.map((notice, i) => {
            const isRead = readNotices.includes(notice.id);
            return (
              <ListItem
                key={notice.id}
                alignItems="flex-start"
                disableGutters
                onClick={() => handleMarkAsRead(notice.id)}
                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f9f9f9" } }}
              >
                <ListItemText
                  primary={
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">
                        {notice.title}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {!isRead && <Chip size="small" label="New" color="primary" />}
                        <Typography variant="caption" color="text.secondary">
                          {notice.date}
                        </Typography>
                      </Stack>
                    </Stack>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {notice.content}
                    </Typography>
                  }
                />
                {i !== allNotices.length - 1 && <Divider sx={{ my: 2 }} />}
              </ListItem>
            );
          })}
        </List>
      )}
    </Paper>
  );
}
