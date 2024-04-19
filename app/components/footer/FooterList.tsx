
// Define the props interface for the FooterList component
interface FooterListProps{
    title: string; // Title for the footer list
    children: React.ReactNode; // Children elements to be rendered inside the footer list

}

// FooterList component definition
const FooterList: React.FC<FooterListProps>= ({children}) => {
  return (
    <div className="
    w-full
    sm:w-1/2
    md:w-1/4
    lg:w-1/6
    mb-6
    flex
    flex-col
    gap-2
    ">
        {children}  {/* Render children elements */}
    </div>
  );
}

export default FooterList