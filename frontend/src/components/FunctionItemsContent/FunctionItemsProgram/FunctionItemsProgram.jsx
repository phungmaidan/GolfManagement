import React from 'react';
import Box from '@mui/material/Box';
import DailyOperation from './DailyOperation/DailyOperation';


const FunctionItemsProgram = () => {
    return (
        <Box sx={{
            backgroundColor: 'white',
            marginTop: '20px',
            height: '100%',
            display: 'flex',
            border: '1px solid #e0e0e0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px'
        }}>
            <DailyOperation />
        </Box>
    );
};

export default FunctionItemsProgram;