import Box from "@mui/material/Box"
import LeftContentModule from "./LeftContentModule/LeftContentModule"
import RightContentModule from "./RightContentModule/RightContentModule"

const Function = () => {
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexWrap: 'nowrap' // Changed from 'wrap' to 'nowrap'
        }}>
            <LeftContentModule />
            <RightContentModule />
        </Box>
    )
}

export default Function
