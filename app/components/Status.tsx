import { IconType } from "react-icons";

// Define the props interface for the Status component
interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

// Define the Status component
const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    // Render the status div with dynamic styles based on props
    <div
      className={`
    ${bg}
    ${color}
    px-1
    rounded
    flex
    items-center
    gap-1
    `}
    >
      {/* Render the status text and icon */}
      {text} <Icon size={15} /> {/* Icon with size 15 */}
    </div>
  );
};
// Export the Status component
export default Status;
