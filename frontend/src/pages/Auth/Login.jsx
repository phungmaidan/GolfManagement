import { Button, TextField, Container, Typography, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '~/theme'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { loginUserAPI } from '~/redux/user/userSlice'

function Login() {
  const dispatch = useDispatch()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUserAPI({ account, password }))
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8
          }}
        >
          <Typography component="h1" variant="h5" color="primary">
            Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Account"
              name="account"
              autoComplete="account"
              autoFocus
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login