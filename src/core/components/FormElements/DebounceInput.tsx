import React, { ChangeEvent, useEffect, useState } from 'react';

interface DebounceInputProps {
    value?: string | undefined;
    debounce?: number;
    placeholder?: string;
    type?: string;
    onInputValue: (value: string) => void;
    setLoading: (state: boolean) => void;
}

const DebounceInput: React.FC<DebounceInputProps> = ({ value: initialValue, debounce = 750, placeholder = "", type = 'text', onInputValue, setLoading }: DebounceInputProps) => {
    const [value, setValue] = useState<string | undefined>(initialValue)

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        function runTimeout(value:string) {
            const timeout = setTimeout(() => {
                if (onInputValue) {
                    onInputValue(value);
                    setLoading(true);
                }
            }, debounce)

            return () => clearTimeout(timeout);
        }

        if (typeof value == 'string') runTimeout(value);

    }, [value])

    return (
        <input defaultValue={initialValue} type={type} placeholder={placeholder} onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)} />
    )
}

export default DebounceInput