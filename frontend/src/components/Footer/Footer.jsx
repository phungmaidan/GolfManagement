// Footer.jsx
import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  useTheme
} from '@mui/material'

const Footer = () => {
  const theme = useTheme()
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { title: 'Điều khoản sử dụng', path: '/terms' },
    { title: 'Chính sách bảo mật', path: '/privacy' },
    { title: 'Hướng dẫn', path: '/guide' },
    { title: 'Hỗ trợ', path: '/support' }
  ]

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        backgroundColor: 'white',
        borderTop: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
                            © {currentYear} Golf Booking. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
                gap: 3,
                flexWrap: 'wrap'
              }}
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.path}
                  underline="none"
                  color="text.secondary"
                  sx={{
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer