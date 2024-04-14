"use client";
// Importing necessary types from react-hook-form
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

// Defining the props interface for the Input component
interface InputProps {
  id: string; // Unique identifier for the input field
  label: string; // Text label for the input field
  type?: string; //specifies the type of input field (e.g., text, number)
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>; // React Hook Form's register function
  errors: FieldErrors; // Object containing validation errors for input fields
}

// Input component definition
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {/* Input field */}
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`
      peer
      w-full
      p-4
      pt-6
      outline-none
      bg-white
      text-black
      font-light
      border-2
      rounded-md
      transition
      disabled:opacity-70
      disabled:cursor-not-allowed
      ${errors[id] ? "border-rose-400" : "border-slate-300"} 
      ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}
      `}
      />
      {/* Label for the input field */}
      <label
        htmlFor={id}
        className={`absolute
        cursor-text
        text-md
        duration-150
        tranform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        left-4
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : "text-slate-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input; // Exporting the Input component
