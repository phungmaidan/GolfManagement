import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

function PageLoadingSpinner({ caption }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      height: "100%",
      width: "100%",
    }}>
      <CircularProgress sx={{ color: (theme) => theme.palette.success.main }} />
      <Typography>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner