
interface CategoryNavItemProps{
    selected?: boolean; 
    label: string;

}

const CategoryNavItem: React.FC<CategoryNavItemProps> = ({selected,label}) => {
  return (
    <div className={`flex item-center justify-center text-center gap-1 px-8 py-3 border-b-2 rounded-md
    hover:text-white transition cursor-pointer bg-gradient-to-r from-violet-900 to-purple-500 ${selected ? 'border-b-violet-500 text-white' : 'border-transparent text-white' } `}>
        <div className="font-medium text-sm text-center break-normal">
            {label}
        </div>
    </div>
  );
};

export default CategoryNavItem;