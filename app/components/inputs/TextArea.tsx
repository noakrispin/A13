"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

// Define props interface for TextArea component
interface TextAreaProps {
  id: string; // Unique identifier for the textarea
  label: string; // Label text for the textarea
  disabled?: boolean; // Optional boolean indicating if the textarea is disabled
  required?: boolean;// Optional boolean indicating if the textarea is required
  register: UseFormRegister<FieldValues>; // useFormRegister hook from react-hook-form
  errors: FieldErrors; // FieldErrors object from react-hook-form
}

// Define TextArea component
const TextArea: React.FC<TextAreaProps> = ({id,label,disabled,required,register,errors,}) => {
  return (
    <div className="w-full relative">
      {/* Render textarea input */}
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`
        peer
        w-full
        p-4
        pt-6
        max-h-[150px]
        min-h-[150px]
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
      {/* Render label */}
      <label
        htmlFor={id}
        className={`
        absolute
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

export default TextArea;// Export TextArea component
