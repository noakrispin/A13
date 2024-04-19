// Import React from the 'react' library
import React from 'react';

//Heading  Components to use in are application
interface HeadingProps{ 
    title: string,
    center?: boolean 
}

// Functional component to render a heading
const Heading: React.FC<HeadingProps> = ({title,center}) => {
  return (
    // Render the heading with conditional class for text alignment
    <div className={center? 'text-center' : 'text-start'}>
      {/* Render the title with bold font and text size 2xl */}
        <h1 className="font-bold text-2xl ">{title}</h1>
    </div>
  );
};

// Export the Heading component
export default Heading;