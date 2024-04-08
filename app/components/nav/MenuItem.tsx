// Define the props interface for MenuItem component
interface MenuItemProps {
    children: React.ReactNode;
    onClick: () => void;
}

// MenuItem component to render a clickable menu item
const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
    return (
        <div className="px-4 py-3 hover:bg-neutral-100 transition text-black">
            <a onClick={onClick}>{children}</a>
        </div>
    );
};

export default MenuItem;
