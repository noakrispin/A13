'use client';

import { IconType } from "react-icons";

interface ButtonPtops{
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    custom?: string; 
    icon?: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>)
    => void;
}

const Button: React.FC <ButtonPtops> = ({
    label,
    disabled,
    outline, 
    small,
    custom,
    icon: Icon,
    onClick,
}) => {
  return (
    <button 
    disabled = {disabled}
    className={`
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-1/2
    border-violet-500
    flex
    item-center
    justify-center
    gap-2
    ${outline ? "bg-white": "bg-violet-500" }
    ${outline ? "text-violet-500": "text-white" }
    ${small ? "text-sm font-light": "text-md [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black" }
    ${small ? "py-1 px-2 border[1px]": "py-3 px-4 border[2px]" }
    ${custom ? custom :''}
    `}>
        {/*chack if icon exsit */}
        {Icon && <Icon size={24}/>}
        {label}

    </button>
  )
}

export default Button;