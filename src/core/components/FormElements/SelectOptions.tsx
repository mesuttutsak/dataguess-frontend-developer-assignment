import { useState } from "react";

interface SelectOptionsProps {
    id: string;
    options: string[];
    onChange: (selectedOption: string) => void;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({ id, options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newOption = e.target.value;
        setSelectedOption(newOption);
        onChange(newOption);
    };

    return (
        <select id={id} value={selectedOption} onChange={handleOptionChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
export default SelectOptions;