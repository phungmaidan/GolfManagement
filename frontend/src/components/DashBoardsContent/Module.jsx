import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { selectCurrentUser } from '~/redux/user/userSlice';
import { setSelectedModule } from '~/redux/module/moduleSlice';
import { getItemAPI } from '~/redux/module/moduleSlice'

const Module = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userModules = currentUser?.userModule || [];
  const selectedModule = useSelector((state) => state.module.selectedModule);

  // Khi danh sách modules có dữ liệu và chưa có module nào được chọn thì chọn module đầu tiên
  useEffect(() => {
    if (!selectedModule && userModules.length > 0) {
      dispatch(setSelectedModule(userModules[0]));
    }
  }, [selectedModule, userModules, dispatch]);

  const handleModuleClick = (module) => {
    if (selectedModule !== module) {
      dispatch(setSelectedModule(module))
      dispatch(getItemAPI())
    }
  }

  return (
    <Box
      sx={{
        height: '15vh',
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexWrap: 'nowrap',
      }}
    >
      {userModules.map((module) => (
        <Button
          key={module.ModuleID}
          variant={
            selectedModule?.ModuleName === module.ModuleName
              ? 'contained'
              : 'outlined'
          }
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
            bgcolor:
              selectedModule?.ModuleName === module.ModuleName
                ? 'primary.main'
                : 'secondary.light',
            color:
              selectedModule?.ModuleName === module.ModuleName
                ? 'secondary.light'
                : 'primary.main',
          }}
          onClick={() => handleModuleClick(module)}
        >
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {module.ModuleName}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default Module;
