// frontend/src/App.jsx
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '~/theme'
import Login from '~/components/Login/Login.jsx'
import Header from '~/components/Header/Header.jsx'
import Footer from '~/components/Footer/Footer.jsx'
import Box from '@mui/material/Box'
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Header
          logo="https://songbegolf.com.vn/template/images/logo.svg"
          isAuthenticated={false}
        />
        <Box component="main" sx={{
          flexGrow: 1,
          paddingTop: '70px'
        }}>
          {/* Your content here */}
          <Login />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App