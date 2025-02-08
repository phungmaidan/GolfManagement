import React from 'react';
import { useSelector } from "react-redux";
import { selectSelectedItem } from "~/redux/module/moduleSlice";
import Container from '@mui/material/Container';
import FunctionItemsProgram from '~/components/FunctionItemsContent/FunctionItemsProgram/FunctionItemsProgram';
import FunctionItemsTitle from '~/components/FunctionItemsContent/FunctionItemsTitle/FunctionItemsTitle';

const FunctionItems = () => {
    const selectedItem = useSelector(selectSelectedItem); // This should be replaced with actual logic to get the selected item
    return (
        <Container style={{
            paddingTop: '30px',
            paddingBottom: '30px',
            height: '1000px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'primary.light',
        }}>
            <FunctionItemsTitle />
            <FunctionItemsProgram />
        </Container>
    );
};

export default FunctionItems;