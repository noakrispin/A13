"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

// Define props interface for CustomCheckBox component
interface CustomCheckBoxProps {
  id: string; // Unique identifier for the checkbox
  label: string; // Label text for the checkbox
  disabled?: boolean; // Optional boolean indicating if the checkbox is disabled
  register: UseFormRegister<FieldValues>; // useFormRegister hook from react-hook-form
}

// Define CustomCheckBox component
const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ id, label, disabled, register }) => {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      {/* Render checkbox input */}
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        {...register(id)} // Register checkbox input with react-hook-form
        placeholder=""
        className="cursor-pointer" // Apply cursor pointer style
      />
      {/* Render label for the checkbox */}
      <label htmlFor={id} className="font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckBox; // Export CustomCheckBox component
