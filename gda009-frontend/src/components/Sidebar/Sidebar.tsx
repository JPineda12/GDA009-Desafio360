import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArtTrackIcon from '@mui/icons-material/Article';

interface SidebarProps {
  items: { nombre: string; icon?: React.ReactNode }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ display: 'flex', position: 'sticky' }}>
      {!isOpen && (
        <IconButton onClick={toggleSidebar} sx={{ position: 'relative' }}>
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant="persistent"
        open={isOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: isOpen ? 240 : 0,
            flexShrink: 0,
            overflowX: 'hidden',
            transition: 'width 0.3s',
            position: 'relative'
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 1,
          }}
        >
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </Box>
        <List>
          {items.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon ? item.icon : <ArtTrackIcon />}</ListItemIcon>
                <ListItemText primary={item.nombre} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
