import { useState } from "react";

interface SelectOptionsProps {
    options: string[];
    onChange: (selectedOption: string) => void;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newOption = e.target.value;
        setSelectedOption(newOption);
        onChange(newOption);
    };

    return (
        <select value={selectedOption} onChange={handleOptionChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
export default SelectOptions;