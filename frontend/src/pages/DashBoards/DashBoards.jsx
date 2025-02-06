import { useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Module from '~/components/DashBoardsContent/Module';
import Function from '~/components/DashBoardsContent/Function/Function';

const Dashboard = () => {
  const theme = useTheme();
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'primary.light',
      }}
    >
        <Header />

        {/* Nội dung chính chiếm toàn bộ không gian còn lại */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Module />
          <Function />
        </Box>

        <Footer />
    </Container>
  );
};

export default Dashboard;
