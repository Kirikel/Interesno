import React, { useState } from 'react';
import styles from './multiSelect.module.css';

interface Option {
    name: string;
    value: string;
}

interface MultiSelectProps {
    options: Option[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
}


const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedValues, onChange, placeholder = 'Select options...', className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: string) => {
        const newSelected = selectedValues.includes(value)
            ? selectedValues.filter((selected) => selected !== value)
            : [...selectedValues, value];
        onChange(newSelected);
    };

    const selectedLabels = options.filter(option => selectedValues.includes(option.value)).map(option => option.name).join(', ');

    return (
        <div className={`${styles["multi-select-container"]} ${className}`}>
            <div className={`${styles["multi-select-header"]} ${isOpen ? styles["multi-select-header-open"] : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles["multi-select-display"]}>
                    {selectedLabels || placeholder}
                </div>
                <div className={`${isOpen ? styles.activeArrow : ''}`}>↓</div>
            </div>
            {isOpen && (
                <div className={styles["multi-select-options"]} >
                    {
                        options.map(option => (
                            <label key={option.value} className={styles["multi-select-option"]} >
                                <input
                                    type="checkbox"
                                    className={styles["multi-select-checkbox"]}
                                    checked={selectedValues.includes(option.value)}
                                    onChange={() => handleSelect(option.value)}
                                />
                                {option.name}
                            </label>
                        ))
                    }
                </div >
            )
            }
        </div >
    );
};

export default MultiSelect;
