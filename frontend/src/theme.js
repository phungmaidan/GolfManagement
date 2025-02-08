// frontend/src/theme.js
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0B4619', // Xanh đậm của cỏ golf
      light: '#1A5F2F',
      dark: '#083012',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#D4AF37', // Màu vàng sang trọng
      light: '#fde047',
      dark: '#A88A2A',
      contrastText: '#000000'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FDF7F4'
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
      disabled: '#9E9E9E'
    },
    error: {
      main: '#DC3545',
      light: '#E57373',
      dark: '#D32F2F'
    },
    warning: {
      main: '#FFC107',
      light: '#FFB74D',
      dark: '#F57C00'
    },
    info: {
      main: '#17A2B8',
      light: '#4FC3F7',
      dark: '#0288D1'
    },
    success: {
      main: '#28A745',
      light: '#81C784',
      dark: '#388E3C'
    }
  },
  typography: {
    fontFamily: '\'Montserrat\', \'Roboto\', sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400
    }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0B4619'
        }
      }
    }
  }
})

export default theme