"use client";

import { IconType } from "react-icons";

// Define props interface for CategoryInput component
interface CategoryInputProps {
  selected?: boolean; // Optional boolean indicating if the category is selected
  label: string; // Label text for the category
  icon: IconType; // Icon component for the category
  onClick: (value: string) => void; // onClick event handler function
}

// Define CategoryInput component
const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)} // Handle click event by passing the label value to onClick function
      className={`rounded-xl border-4 p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer
      ${selected ? "border-slate-500" : "border-slate-200"} 
      `} // Conditional border color based on selected state
    >
      {/* Render icon component */}
      <Icon size={30} />
      {/* Render label */}
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput; // Export CategoryInput component
