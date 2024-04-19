'use client';

import { IconType } from "react-icons";

// Define the props interface for the Button component
interface ButtonProps{
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    custom?: string; 
    icon?: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>)
    => void;
}

// Button component definition
const Button: React.FC <ButtonProps> = ({
    label,
    disabled,
    outline, 
    small,
    custom,
    icon: Icon,
    onClick,
}) => {
  // Render a button element with dynamic classNames and onClick event handler
  return (
    <button 
    onClick={onClick}
    disabled = {disabled}
    className={`
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-full
    border-violet-500
    flex
    item-center
    justify-center
    gap-2
    ${outline ? "border-solid border-2 border-indigo-600 ": "bg-violet-500" }
    ${outline ? "text-violet-500": "text-white" }
    ${outline ? "text-violet-200": "text-black" }
    ${small ? "text-sm font-light": "text-md [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black " }
    ${small ? "py-1 px-2 border[1px]": "py-3 px-4 border[2px]" }
    ${custom ? custom :''}

    `}>
      {/*chack if icon exsit */}
      {Icon && <Icon size={24}/>}
      {label} {/* Render the button label */}

    </button>
  )
};

export default Button;