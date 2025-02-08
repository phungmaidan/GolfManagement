// Header.jsx
import React, { useState } from 'react';
import {
  Box,
  Toolbar,
  IconButton,
  Button,
  Menu,
  Container,
  Avatar,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';

const Header = ({ logo }) => {
  const isMobile = window.innerWidth < 768;
  const isAuthenticated = useSelector(selectCurrentUser).Active;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Menu items cho người dùng đã đăng nhập
  const authMenuItems = [
    { title: 'Đặt lịch', path: '/booking' },
    { title: 'Lịch sử đặt', path: '/history' },
    { title: 'Tài khoản', path: '/account' },
  ];

  // Menu items cho người dùng chưa đăng nhập
  const guestMenuItems = [
    { title: 'Đặt lịch', path: '/booking' },
  ];

  const currentMenuItems = isAuthenticated ? authMenuItems : guestMenuItems;

  return (
    <Box
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '70px' }}>
          {/* Logo */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: '40px',
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
              {currentMenuItems.map((item) => (
                <Button
                  key={item.title}
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'primary.dark',
                    }
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          )}

          {/* User Section */}
          <Box sx={{ flexGrow: 0, ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile ? (
              <IconButton
                size="large"
                onClick={handleMenu}
                sx={{ color: 'primary.main' }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              isAuthenticated ? (
                // Hiển thị avatar nếu đã đăng nhập
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    bgcolor: 'primary.main',
                    cursor: 'pointer'
                  }}
                  onClick={handleMenu}
                />
              ) : (
                // Hiển thị nút đăng nhập/đăng ký nếu chưa đăng nhập
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      borderRadius: '4px',
                      textTransform: 'none',
                      minWidth: '100px'
                    }}
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: '4px',
                      textTransform: 'none',
                      minWidth: '100px'
                    }}
                  >
                    Đăng ký
                  </Button>
                </Box>
              )
            )}
          </Box>

          {/* Menu (Mobile & Desktop) */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }
            }}
          >
            
            {isMobile && currentMenuItems.map((item) => (
              <MenuItem
                key={item.title}
                onClick={handleClose}
                sx={{ minWidth: 180 }}
              >
                {item.title}
              </MenuItem>
            ))}

            {/* Logout Option (Only show if authenticated) */}
            {isAuthenticated && (
              <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Header;