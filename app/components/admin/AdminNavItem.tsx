import { IconType } from "react-icons";

// Define props interface for AdminNavItem component
interface AdminNavItemProps{
  selected?: boolean; // Optional boolean prop indicating if the item is selected
  icon: IconType; // Required prop for icon type
  label: string; // Required prop for label text
}

// Define AdminNavItem component
const AdminNavItem: React.FC<AdminNavItemProps> = ({selected, icon: Icon, label})=> {
  return (
  <div className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-300 transition cursor-pointer
  ${selected ? 'border-b-slate-300 text-slate-300' : 'border-transparent text-slate-100'}`}>
    {/* Render the icon using the provided icon type */}
    <Icon size={20}/>
     {/* Render label text */}
    <div className="font-medium text-sm text-center break-normal">{label}</div>
  </div>

 );
};

export default AdminNavItem;// Export AdminNavItem component