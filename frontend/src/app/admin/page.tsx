"use client";

import React, { ReactNode, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useRouter } from "next/navigation";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CampaignIcon from "@mui/icons-material/Campaign";
import EventNoteIcon from "@mui/icons-material/EventNote";

const drawerWidth = 240;

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function Admin({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      <ListItemButton selected={true} onClick={() => router.push("/employees")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary='Home' />
      </ListItemButton>

      <ListItemButton
        component='a'
        onClick={() => router.push("/tasks")}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Tasks' />
      </ListItemButton>

      {/* <ListItemButton
        component='a'
        onClick={() => router.push("/employees/[id]/edit")}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary='Edit Employee' />
      </ListItemButton> */}
      <ListItemButton onClick={() => router.push("/admin/notices")}>
  <ListItemIcon><CampaignIcon /></ListItemIcon> {/* import from @mui/icons-material */}
  <ListItemText primary="Notices" />
</ListItemButton>

<ListItemButton onClick={() => router.push("/admin/leave-management")}>
  <ListItemIcon>
    <EventNoteIcon /> {/* You may need to import this */}
  </ListItemIcon>
  <ListItemText primary="Leave Requests" />
</ListItemButton>

      <ListItemButton component='a' href='/'>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItemButton>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          ml: { sm: drawerWidth },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar>
          <IconButton
            color='inherit'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Employee Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'>
        {/* Mobile drawer */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}>
        {children}
      </Box>
    </Box>
  );
}
