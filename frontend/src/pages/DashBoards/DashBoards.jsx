import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import authorizedAxiosInstance from '~/utils/authorizeAxios';
import { API_ROOT } from '~/utils/constants';
import { selectCurrentUser } from '~/redux/user/userSlice';

const DashboardLayout = () => {
  const theme = useTheme();
  const currentUser = useSelector(selectCurrentUser);
  const [moduleData, setModuleData] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState('Tasks');
  const [selectedModule, setSelectedModule] = useState(null);

  const handleFunctionClick = (functionType) => {
    setSelectedFunction(functionType);
  };

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setSelectedFunction('Tasks');
  };

  useEffect(() => {
    if (selectedModule && selectedFunction) {
      const fetchData = async () => {
        try {
          const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/modules/${selectedModule.ModuleID}/${selectedFunction}`);
          const itemNames = response.data.map(item => item.ItemName);
          setModuleData(itemNames);
        } catch (error) {
          console.error('Error fetching module data:', error);
        }
      };
      fetchData();
    }
  }, [selectedModule, selectedFunction]);

  const userModules = currentUser?.userModule || [];

  return (
    <Container maxWidth="xl" sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '2vh',
      padding: '2vh'
    }}>
      {/* Top Content */}
      <Box sx={{
        backgroundColor: '#4A90E2',
        height: '25vh',
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexWrap: 'wrap'
      }}>
        {userModules.map((module) => (
          <Box
            key={module.ModuleID}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              m: 1,
              width: 130,
              height: 50,
              bgcolor: selectedModule?.ModuleID === module.ModuleID ? 'primary.main' : theme.palette.secondary.light,
              color: selectedModule?.ModuleID === module.ModuleID ? theme.palette.secondary.light : 'primary.main',
            }}
            onClick={() => handleModuleClick(module)}
          >
            <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {module.ModuleName}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Bottom Row Container */}
      <Box sx={{
        display: 'flex',
        gap: '2vh',
        height: '35vh'
      }}>
        {/* Left Content */}
        <Box sx={{
          backgroundColor: '#50C878',
          width: '10rem',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          {['Tasks', 'Reports', 'Setting'].map((functionType) => (
            <Button
              key={functionType}
              variant={selectedFunction === functionType ? 'contained' : 'outlined'}
              sx={{
                width: '100%',
                height: 50,
                m: 1,
                bgcolor: selectedFunction === functionType ? 'primary.main' : 'transparent',
                color: selectedFunction === functionType ? theme.palette.secondary.light : 'primary.main',
                borderColor: 'primary.main',
              }}
              onClick={() => handleFunctionClick(functionType)}
            >
              {functionType}
            </Button>
          ))}
        </Box>

        {/* Right Content */}
        <Box sx={{
          backgroundColor: '#FF6B6B',
          flex: 1,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          flexWrap: 'wrap'
        }}>
          {moduleData.map((item, index) => (
            <Button
              key={index}
              sx={{
                m: 1,
                width: 130,
                height: 50,
                bgcolor: theme.palette.secondary.light,
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: theme.palette.secondary.light,
                },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardLayout;