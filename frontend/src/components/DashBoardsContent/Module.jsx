import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { selectCurrentUser } from '~/redux/user/userSlice';
import Button from "@mui/material/Button"

const Module = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [selectedModule, setSelectedModule] = useState(null);

    const handleModuleClick = (module) => {
        setSelectedModule(module);
        //setSelectedFunction('Tasks');
    };
    const userModules = currentUser?.userModule || [];

    return (
              <Box sx={{
                height: '15vh',
                width: '100%',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexWrap: 'nowrap'
              }}>
                {userModules.map((module) => (
                    <Button
                    key={module.ModuleID}
                    variant={selectedModule === module.ModuleName ? 'contained' : 'contained'}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 3.5,
                      border: '1px solid',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      m: 1,
                      width: 130,
                      height: 50,
                        bgcolor: selectedModule?.ModuleName === module.ModuleName ? 'primary.main' : 'secondary.light',
                        color: selectedModule?.ModuleName === module.ModuleName ? 'secondary.light' : 'primary.main',
                    }}
                        onClick={() => handleModuleClick(module)}
                  >
                    <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {module.ModuleName}
                    </Typography>
                    </Button>
                ))}
            </Box>
    );
};

export default Module;