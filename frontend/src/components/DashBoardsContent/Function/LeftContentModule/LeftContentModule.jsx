import Box from "@mui/material/Box"
import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button"

const LeftContentModule = () => {
    const [selectedFunction, setSelectedFunction] = useState('Tasks');

    const handleFunctionClick = (functionType) => {
        setSelectedFunction(functionType);
    };

    return (
        <Box sx={{
            height: '100%',
            width: '30vh',
            //display: 'flex',
            color: 'white',
            flexWrap: 'wrap',
            //gap: '2rem', // Thay đổi giá trị gap thành 2 rem
        }}>
            {['Tasks', 'Reports', 'Setting'].map((functionType) => (
                <Button
                    key={functionType}
                    variant={selectedFunction === functionType ? 'contained' : 'contained'}
                    sx={{
                        width: '90%',
                        height: 50,
                        m: 1,
                        bgcolor: selectedFunction === functionType ? 'primary.main' : 'secondary.light',
                        color: selectedFunction === functionType ? 'secondary.light' : 'primary.main',
                        borderColor: 'secondary.light',
                    }}
                    onClick={() => handleFunctionClick(functionType)}
                >
                    {functionType}
                </Button>
            ))}
        </Box>
    )
}

export default LeftContentModule
