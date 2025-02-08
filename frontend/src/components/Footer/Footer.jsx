// Footer.jsx
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = ({ logo }) => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.dark,
        color: 'white',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: '60px',
                  marginBottom: theme.spacing(2),
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Trải nghiệm golf đẳng cấp với những sân golf tuyệt đẹp và dịch vụ chuyên nghiệp.
              Chúng tôi cam kết mang đến những giây phút thư giãn và niềm đam mê golf cho quý khách.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Liên kết nhanh
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {['Trang chủ', 'Về chúng tôi', 'Dịch vụ', 'Đặt lịch', 'Tin tức'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  color="inherit"
                  sx={{
                    mb: 1,
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dịch vụ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {['Sân tập Golf', 'Học Golf', 'Pro Shop', 'Nhà hàng', 'Sự kiện'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  color="inherit"
                  sx={{
                    mb: 1,
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Liên hệ
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 2 }} />
                <Typography variant="body2">
                  123 Đường Golf, Quận 2, TP. Hồ Chí Minh
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2 }} />
                <Typography variant="body2">
                  +84 123 456 789
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <EmailIcon sx={{ mr: 2 }} />
                <Typography variant="body2">
                  info@golfclub.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright */}
        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          © {currentYear} Golf Club. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;