import React from 'react';

// Define the HomeBanner component
const HomeBanner = () => {
  return (
    // Container for the banner, with padding and relative positioning
    <div className="pt-10 xl:px-20 px-4 relative z-0"> 
    {/* Flex container for text content and ellipse */}
      <div className="mx-auto px-2 py-0 flex flex-col md:flex-row gap-2 justify-left items-start relative">
        {/* Text Content */}
        <div className="md:w-1/2 text-violet-400 z-10 relative">
          <h1 className="text-5xl font-bold mb-5 font-primary">Original art to buy online</h1>
          <p className="text-xl mb-7 font-primary">
            Discover and buy original, hand-crafted art direct from independent artists around the world.
            <br />From show-stopping oil paintings to NFTs, stand-out sculptures to classic fine art photography, take your pick and find your match.
          </p>
        </div>
        {/* Ellipse */}
        <div className="md:w-1/2 absolute top-0 right-0 z-0">
          <div className="Ellipse1 w-100 h-96 bg-gradient-to-br from-violet-900 to-transparent bg-opacity-60 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
