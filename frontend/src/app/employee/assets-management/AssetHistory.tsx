"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";

const assetHistory = [
  {
    itemId: 101,
    itemName: "Laptop",
    serialNumber: "LAP12345",
    events: [
      { type: "Assigned", date: "2025-05-01", by: "Admin" },
      { type: "Acknowledged", date: "2025-05-02", by: "Employee" },
      { type: "Reported Issue", date: "2025-05-10", by: "Employee", notes: "Battery issue" },
    ],
  },
  {
    itemId: 102,
    itemName: "ID Card",
    serialNumber: "ID001",
    events: [
      { type: "Assigned", date: "2025-05-01", by: "Admin" },
      { type: "Acknowledged", date: "2025-05-01", by: "Employee" },
    ],
  },
];

export default function AssetHistory() {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Asset History
      </Typography>

      {assetHistory.map((asset) => (
        <Paper key={asset.itemId} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6">{asset.itemName}</Typography>
          <Typography variant="body2" color="text.secondary">
            Serial: {asset.serialNumber}
          </Typography>
          <Divider sx={{ my: 1 }} />

          <List dense>
            {asset.events.map((event, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={`${event.type} on ${event.date}`}
                  secondary={`By: ${event.by}${event.notes ? ` – ${event.notes}` : ""}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
}
