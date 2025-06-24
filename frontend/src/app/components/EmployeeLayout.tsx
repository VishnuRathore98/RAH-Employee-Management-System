"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  AppBar,
  CssBaseline,
} from "@mui/material";
import {
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
  Task as TaskIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import CampaignIcon from "@mui/icons-material/Campaign";
import InventoryIcon from "@mui/icons-material/Inventory";

const drawerWidth = 220;

export default function EmployeeLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/employee" },
    // { text: "Attendance", icon: <TimeIcon />, path: "/employee/attendance" },
    { text: "Tasks", icon: <TaskIcon />, path: "/employee/tasks" },
    {text: "Notices", icon:<CampaignIcon/>, path:"/employee/notices"},
    {text: "Leaves", icon:<CampaignIcon/>, path:"/employee/leave"},
    { label: "My Assets", path: "/employee/assets", icon: <InventoryIcon /> },

    { text: "Logout", icon: <LogoutIcon />, path: "/" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Employee Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItemButton key={item.text} onClick={() => router.push(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
