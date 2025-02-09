import React from 'react';
import { useSelector } from "react-redux";
import { selectSelectedItem } from "~/redux/module/moduleSlice";
import FunctionItemsProgram from '~/components/FunctionItemsContent/FunctionItemsProgram/FunctionItemsProgram';
import FunctionItemsTitle from '~/components/FunctionItemsContent/FunctionItemsTitle/FunctionItemsTitle';

const FunctionItems = () => {
    const selectedItem = useSelector(selectSelectedItem);
    return (
        <div className="pt-[60px] pb-[30px] h-[1000px] flex flex-col bg-gradient-golf items-center justify-center">
            <FunctionItemsTitle />
            <FunctionItemsProgram />
        </div>
    );
};

export default FunctionItems;
