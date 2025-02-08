import Box from "@mui/material/Box"
import { useSelector, useDispatch } from 'react-redux'
import Button from "@mui/material/Button"
import { setSelectedFunction, getItemAPI } from '~/redux/module/moduleSlice'

// Import các icon từ MUI
import ChecklistIcon from '@mui/icons-material/Checklist' // Icon cho Tasks
import BarChartIcon from '@mui/icons-material/BarChart' // Icon cho Reports
import SettingsIcon from '@mui/icons-material/Settings' // Icon cho Setting

const LeftContentModule = () => {
    const selectedFunction = useSelector((state) => state.module.selectedFunction);
    const dispatch = useDispatch();

    const handleFunctionClick = (functionType) => {
        if (selectedFunction !== functionType) {
            dispatch(setSelectedFunction(functionType))
            dispatch(getItemAPI())
        }
    }

    // Định nghĩa icon tương ứng với mỗi chức năng
    const functionIcons = {
        Tasks: <ChecklistIcon />,
        Reports: <BarChartIcon />,
        Setting: <SettingsIcon />
    }

    return (
        <Box sx={{
            height: '100%',
            width: '30vh',
            color: 'white',
            flexWrap: 'wrap',
        }}>
            {['Tasks', 'Reports', 'Setting'].map((functionType) => (
                <Button
                    key={functionType}
                    variant="contained"
                    startIcon={functionIcons[functionType]} // Thêm icon tương ứng
                    sx={{
                        width: '90%',
                        height: 50,
                        m: 1,
                        bgcolor: selectedFunction === functionType ? 'primary.main' : 'secondary.light',
                        color: selectedFunction === functionType ? 'secondary.light' : 'primary.main',
                        borderColor: 'secondary.light',
                        justifyContent: 'flex-start', // Căn lề icon và chữ
                        textTransform: 'none' // Không viết hoa toàn bộ chữ
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
