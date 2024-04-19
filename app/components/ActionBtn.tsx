import { IconType } from "react-icons";

// Define the props interface for the ActionBtn component
interface ActionBtnProps {
  icon: IconType; // Icon component to be displayed on the button
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // onClick event handler function
  disabled?: boolean; // Optional prop to disable the button
}

// ActionBtn component definition
const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex
        items-center
        justify-center
        rounded
        cursor-pointer
        w-[40px]
        h-[30px]
        text-slate-700
        border
        border-slate-400
        ${disabled && "opacity-50 cursor-not-allowed"}
    `}
    >
      {/* Render the Icon component with size and color */}
      <Icon size={18} color={"white"}/>
    </button>
  );
};

export default ActionBtn;
