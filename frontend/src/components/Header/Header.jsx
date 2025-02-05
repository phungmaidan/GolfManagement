// Header.jsx
import { useState } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Menu,
  Container,
  Avatar,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Header = ({ logo, isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuItems = [
    { title: 'Đặt lịch', path: '/booking' },
    { title: 'Lịch sử đặt', path: '/history' },
    { title: 'Tài khoản', path: '/account' }
  ]

  return (
    <AppBar
      position="fixed"
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

          {/* Desktop Navigation - Chỉ hiển thị khi đã đăng nhập */}
          {!isMobile && isAuthenticated && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: theme.palette.primary.dark
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
            {isAuthenticated ? (
            // User đã đăng nhập
              <>
                {isMobile ? (
                  <IconButton
                    size="large"
                    onClick={handleMenu}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <Avatar
                    sx={{
                      width: 35,
                      height: 35,
                      bgcolor: theme.palette.primary.main,
                      cursor: 'pointer'
                    }}
                    onClick={handleMenu}
                  />
                )}
              </>
            ) : (
            // Chưa đăng nhập - chỉ hiện nút đăng nhập
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '4px',
                  textTransform: 'none',
                  minWidth: '100px'
                }}
              >
                                Đăng nhập
              </Button>
            )}
          </Box>

          {/* Menu (Mobile & Desktop) - Chỉ hiển thị khi đã đăng nhập */}
          {isAuthenticated && (
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            >
              {/* Mobile Menu Items */}
              {isMobile && menuItems.map((item) => (
                <MenuItem
                  key={item.title}
                  onClick={handleClose}
                  sx={{ minWidth: 180 }}
                >
                  {item.title}
                </MenuItem>
              ))}

              {/* Logout Option */}
              <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
            </Menu>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header