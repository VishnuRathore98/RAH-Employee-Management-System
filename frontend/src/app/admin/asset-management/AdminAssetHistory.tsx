"use client";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

// Mock data
const mockAssetHistories = [
  {
    employeeName: "Alice Johnson",
    employeeId: 1,
    assets: [
      {
        itemName: "Laptop",
        serialNumber: "LAP12345",
        events: [
          { type: "Assigned", date: "2025-05-01", by: "Admin" },
          { type: "Acknowledged", date: "2025-05-02", by: "Alice Johnson" },
        ],
      },
    ],
  },
  {
    employeeName: "Bob Smith",
    employeeId: 2,
    assets: [
      {
        itemName: "Monitor",
        serialNumber: "MON998",
        events: [
          { type: "Assigned", date: "2025-05-03", by: "Admin" },
          { type: "Reported Issue", date: "2025-05-10", by: "Bob Smith", notes: "Screen flickering" },
        ],
      },
    ],
  },
];

export default function AdminAssetHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = mockAssetHistories.filter((emp) =>
    emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Employee Asset History
      </Typography>

      <TextField
        label="Search Employee"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredEmployees.map((employee) => (
        <Accordion key={employee.employeeId} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>{employee.employeeName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {employee.assets.map((asset, index) => (
              <Paper key={index} sx={{ mb: 2, p: 2 }}>
                <Typography variant="h6">{asset.itemName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Serial: {asset.serialNumber}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <List dense>
                  {asset.events.map((e, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={`${e.type} on ${e.date}`}
                        secondary={`By: ${e.by}${e.notes ? ` – ${e.notes}` : ""}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      {filteredEmployees.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No employees found.
        </Typography>
      )}
    </Box>
  );
}
