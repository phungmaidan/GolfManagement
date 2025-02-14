import React from 'react';
import FunctionItemsProgram from '~/components/FunctionItemsContent/FunctionItemsProgram/FunctionItemsProgram';
import FunctionItemsTitle from '~/components/FunctionItemsContent/FunctionItemsTitle/FunctionItemsTitle';

const FunctionItems = () => {
    return (
        <div className="flex gap-5 min-h-150 flex-col bg-gradient-luxury justify-center">
            <FunctionItemsTitle />
            <FunctionItemsProgram />
        </div>
    );
};

export default FunctionItems;
