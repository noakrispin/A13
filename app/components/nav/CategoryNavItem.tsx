
// // Interface for CategoryNavItem component props
// interface CategoryNavItemProps{
//     selected?: boolean; // Indicates whether the category is selected
//     label: string; // Label for the category

// }

// // CategoryNavItem component to render a category navigation item
// const CategoryNavItem: React.FC<CategoryNavItemProps> = ({selected,label}) => {
//   return (
//     <div className={`flex item-center justify-center text-center gap-1 px-8 py-3 border-b-2 rounded-md
//     hover:text-white transition cursor-pointer bg-gradient-to-r from-violet-900 to-purple-500 ${selected ? 'border-b-violet-500 text-white' : 'border-transparent text-white' } `}>
//         {/* Category label */}
//         <div className="font-medium text-sm text-center break-normal">
//             {label}
//         </div>
//     </div>
//   );
// };

// export default CategoryNavItem;

import { IconType } from "react-icons";

interface CategoryNavItemProps{
  selected?: boolean; // Optional boolean prop indicating if the item is selected
  icon: IconType; // Required prop for icon type
  label: string; // Required prop for label text
}

const CategoryNavItem: React.FC<CategoryNavItemProps> = ({selected, icon: Icon, label})=> {
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

export default CategoryNavItem;