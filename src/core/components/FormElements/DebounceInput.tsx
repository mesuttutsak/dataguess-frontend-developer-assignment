import React, { useState, useEffect } from 'react';

interface DebounceInputProps {
    id: string;
    value?: string | undefined;
    debounce?: number;
    placeholder?: string;
    type?: string;
    onInputValue: (value: string) => void;
    setLoading: (state: boolean) => void;
}

const DebounceInput: React.FC<DebounceInputProps> = ( {id, value: initialValue, debounce = 750, placeholder = "", type = 'text', onInputValue, setLoading }: DebounceInputProps ) => {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        let debounceTimeout: NodeJS.Timeout;
        setLoading(true);

        debounceTimeout = setTimeout(() => {
            onInputValue(inputValue);
            setLoading(false);
        }, debounce);

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [inputValue]);

    return (
        <input id={id} defaultValue={initialValue} type={type} placeholder={placeholder} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} />
    );
};

export default DebounceInput;
