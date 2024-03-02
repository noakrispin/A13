
const HomeBanner = ()=> {
  return (
    <div className="pt-20 xl:px-28 px-4">
      <div className=' mx-aout px-2 py-0 flex flex-col gap-2 md:flex-row justify-center'>
        <div className='md:w-1/2 text-purple-200'>
          <h1 className='text-5xl font-bold mb-5 font-primary'>Original art to buy online</h1>
          <p className='text-xl mb-7 font-primary'>
            Discover and buy original, hand-crafted art direct from independent artists around the world.
            <br/>From show-stopping oil paintings to NFT’s, stand-out sculptures to classic fine art photography, take your pick and find your match.
          </p>
          <button className='bg-violet-500 hover:bg-opacity-20 px-6 py-2 text-Purple font-semibold rounded-md flex items-center'>Shop Now</button>
        </div>
        {/*ellipse*/}
        <div className='md:w-1/2'>
          <div className="Ellipse1 w-100 h-96 bg-gradient-to-br from-violet-900 to-transparent bg-opacity-60 rounded-full blur-2xl"></div>
        </div>
      </div>
      
    </div>
  );
}
//Home Banner for home page header.
export default HomeBanner;