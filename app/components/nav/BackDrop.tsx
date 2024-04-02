

// Define the props interface for BackDrop component
interface BackDropProps{
    onClick: () => void; 
}

// BackDrop component to render a backdrop that closes on click
const BackDrop: React.FC<BackDropProps> = ({onClick}) => {
  return (
    <div onClick={onClick} className="
    z-20
    bg-slate-200
    opacity-50
    w-screen
    h-screen
    fixed
    top-0
    left-0
    ">

    </div>
  );
};

export default BackDrop;