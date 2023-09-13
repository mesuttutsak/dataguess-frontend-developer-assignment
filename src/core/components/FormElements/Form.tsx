import React, { ReactNode } from 'react';


interface FormProps {
    children: ReactNode;
}

const Form: React.FC<FormProps> = ({ children }) => {
    return (
        <form>
            {children}
        </form>
    );
};

export default Form