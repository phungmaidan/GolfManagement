import React from 'react'
import { useSelector } from "react-redux"
import { selectSelectedItem } from "~/redux/module/moduleSlice"
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack' // Import icon back của MUI

const FunctionItemsTitle = () => {
    const selectedItem = useSelector(selectSelectedItem); // Lấy item đã chọn từ Redux

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link to="/dashboards" style={{ textDecoration: 'none' }}>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />} // Thêm icon back
                    sx={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}
                >
                    Back
                </Button>
            </Link>
            <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" sx={{ color: 'primary.contrastText' }}>
                    {selectedItem?.ItemName || "No Item Selected"}
                </Typography>
            </Box>
        </Box>
    )
}

export default FunctionItemsTitle;
