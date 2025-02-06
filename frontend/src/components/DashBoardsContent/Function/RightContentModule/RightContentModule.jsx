import Box from "@mui/material/Box"
import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button"
const mockData = [
        {
            "ItemID": "FES-4-0",
            "ItemName": "Set Current Station",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-1-0",
            "ItemName": "Item Category",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-2-0",
            "ItemName": "Item Setting",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-13-0",
            "ItemName": "Menu Group Setting",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-14-0",
            "ItemName": "Set Cashier Menu",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-6-0",
            "ItemName": "Receipt Number Setting",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-11-0",
            "ItemName": "Tee Time Status Setting",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-7-0",
            "ItemName": "Tee Time Setting",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-8-0",
            "ItemName": "Assign Daily Tee Time ",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-12-0",
            "ItemName": "Template Schedule Setting",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-9-0",
            "ItemName": "Course Setting",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-15-0",
            "ItemName": "Booking Message Setting",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-16-0",
            "ItemName": "Currency Setting",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-17-0",
            "ItemName": "Voucher Type",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        },
        {
            "ItemID": "FES-18-0",
            "ItemName": "Rain Check Voucher Type",
            "OptionType": "Setting",
            "ModuleID": "Golf"
        }
]
const RightContentModule = () => {
    const [selectedFunction, setSelectedFunction] = useState('Tasks');
    
    const handleFunctionClick = (functionType) => {
        setSelectedFunction(functionType);
    };

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexWrap: 'wrap'
        }}>
            <Box sx={{
                height: '100%',
                width: '90%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)', // 2 cột
                flexWrap: 'wrap',
            }}>
                {mockData.map((item) => (
                    <Button
                        key={item.ItemID}
                        variant={selectedFunction === item.ItemName ? 'contained' : 'contained'}
                        sx={{
                            height: 50,
                            m: 1,
                            bgcolor: selectedFunction.ItemName === item.ItemName ? 'primary.main' : 'secondary.light',
                            color: selectedFunction.ItemName === item.ItemName ? 'secondary.light' : 'primary.main',
                            borderColor: 'secondary.light',
                        }}
                        onClick={() => handleFunctionClick(item)}
                    >
                        {item.ItemName}
                    </Button>
                ))}
            </Box>

        </Box>
    )
}

export default RightContentModule
