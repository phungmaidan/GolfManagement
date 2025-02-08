import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { styled } from '@mui/material/styles';
import { DateTime } from 'luxon';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
}));

const DailyOperation = () => {
    const [selectedDate, setSelectedDate] = useState(DateTime.now());
    const [selectedCourse, setSelectedCourse] = useState('');

    // Danh sách các sân golf mẫu
    const golfCourses = [
        "Lotus - Palm",
        "Desert - Lotus",
        "Palm - Desert",
        "Walk In"
    ];

    // Tạo danh sách các flight từ 6h đến 12h
    const flights = Array.from({ length: 25 }, (_, i) => {
        const hour = Math.floor(i / 2) + 6;
        const minute = (i % 2) * 30;
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    });

    return (
        <Box sx={{ height: '100%', overflow: 'auto' }}>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                {/* Header Card */}
                <Card sx={{ mb: 2 }}>
                    <CardHeader
                        title="Golf Booking"
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            '& .MuiCardHeader-title': {
                                fontSize: '1.5rem',
                                fontWeight: 'bold'
                            }
                        }}
                    />
                    <CardContent>
                        <Box display="flex" gap={2} flexWrap="wrap">
                            {/* Golf Course Selection */}
                            <FormControl fullWidth sx={{ maxWidth: 300 }}>
                                <InputLabel>Chọn sân golf</InputLabel>
                                <Select
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    {golfCourses.map((course) => (
                                        <MenuItem key={course} value={course}>
                                            {course}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Date Picker */}
                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                <DatePicker
                                    label="Chọn ngày"
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue)}
                                    sx={{ maxWidth: 300, width: '100%' }}
                                />
                            </LocalizationProvider>
                        </Box>
                    </CardContent>
                </Card>

                {/* Booking Table */}
                <Paper elevation={3}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Flight Time</StyledTableCell>
                                    <StyledTableCell>Golfer 1</StyledTableCell>
                                    <StyledTableCell>Golfer 2</StyledTableCell>
                                    <StyledTableCell>Golfer 3</StyledTableCell>
                                    <StyledTableCell>Golfer 4</StyledTableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        <Box sx={{ height: 400, overflow: 'auto' }}>
                            <Table>
                                <TableBody>
                                    {flights.map((flight) => (
                                        <TableRow key={flight} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                                            <TableCell sx={{ fontWeight: 'medium' }}>{flight}</TableCell>
                                            {[1, 2, 3, 4].map((golfer) => (
                                                <TableCell key={golfer}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        placeholder="Tên golfer"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </TableContainer>
                </Paper>
            </Container>
        </Box>
    );
};

export default DailyOperation;