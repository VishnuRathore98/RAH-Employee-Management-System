"use client";

import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";

const mockNotices = [
  {
    title: "Team Outing on Friday",
    content: "All employees are invited for a team outing at 4:00 PM this Friday.",
    date: "June 4, 2025 10:30 AM",
  },
  {
    title: "Quarterly Review",
    content: "Quarterly reviews will be conducted between June 10-15. Please be prepared.",
    date: "June 1, 2025 09:00 AM",
  },
];

export default function EmployeeNoticesPage() {
  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Announcements & Notices
      </Typography>

      {mockNotices.length === 0 ? (
        <Typography>No announcements to show.</Typography>
      ) : (
        <List>
          {mockNotices.map((notice, i) => (
            <ListItem key={i} alignItems="flex-start" disableGutters>
              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">{notice.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{notice.date}</Typography>
                  </Stack>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {notice.content}
                  </Typography>
                }
              />
              {i !== mockNotices.length - 1 && <Divider sx={{ my: 2 }} />}
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
