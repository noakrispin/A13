// Define the props interface for the NullData component
interface NullDataProps{
    title: string; // Title to be displayed
}

// Define the NullData component
const NullData: React.FC<NullDataProps> = ({title}) => {
    return(
        // Render a div to display the null data message
        <div className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl">
            {/* Render the title inside a paragraph with font-medium */}
            <p className="font-medium">{title}</p>
        </div>
    )
};

export default NullData;