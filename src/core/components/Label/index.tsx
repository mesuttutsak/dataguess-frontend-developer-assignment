import React from 'react'

interface LabelProps {
    children: React.ReactNode;
    htmlFor: string;
}

const Label = ({ children, htmlFor }: LabelProps) => {
    return (
        <label htmlFor={htmlFor}>
            {children}
        </label>
    )
}

export default Label