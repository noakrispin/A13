import { IconType } from "react-icons";
import { useTheme } from "next-themes"; // Import useTheme hook from next-themes

interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({ selected, icon: Icon, label }) => {
  const { theme } = useTheme(); // Get the current theme using useTheme hook
  
  return (
    <div className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-300 transition cursor-pointer
      ${selected ? 'border-b-slate-300 text-slate-300' : 'border-transparent'} 
      ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}> {/* Apply different text colors based on the theme */}
      <Icon size={20}/>
      <div className="font-medium text-sm text-center break-normal">{label}</div>
    </div>
  );
};

export default AdminNavItem;
