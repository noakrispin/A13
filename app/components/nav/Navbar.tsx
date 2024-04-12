import Link from "next/link";
import Container from "../Container";
import { CiHome, CiSearch } from "react-icons/ci";
import logo from "./public/logo.png";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import getCurrentUser from "@/actions/getCurrentUser";

const Navbar = async () => {

  const currentUser= await getCurrentUser();


  return (
    <div className="top-0 w-full z-30 shadow-sm">
      <Container>
        <div className="text-lg text-white flex flex-col sm:flex-row justify-between items-center py-4 relative">
          {/* Left side: Logo and Navigation Links */}
          
          <div className="flex items-center gap-4">
            

            {/* Navigation Links */}
            <Link href="/" className="flex items-center gap-2">
              {/* Logo */}
              <img src={logo.src} alt="Home" className="h-8" />
              {/* Home text */}
              <span className="ml-2">Home</span>
            </Link>

          </div>

          {/* Middle: Search Box */}
          <div className="flex flex-grow justify-center items-center mt-4 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-1"
              />
              {/* Search Button */}
              <div className="absolute right-1 top-0 h-full flex items-center">
                <Link href="/" className='flex items-center gap-2'><CiSearch className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
          {/* Right side: Account and Cart Icons */}
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="/" className="flex items-center gap-2"><UserMenu currentUser={currentUser}/></Link>
            {/* ----------------------need to implement - when logged in write the name of user---------------------- */}

            {/* Heart Icon ???????
            <div className="flex items-center gap-2">
              <FiHeart />
              <div className="
              absolute
              top-[-8px] 
              right-[-8px]
              bg-purple-300
              text-black
              w-[18px]
              h-[18px]
              rounded-full 
              flex 
              justify-center 
              items-center
              ">
                0
              </div>
            </div>*/}

            {/* Cart Icon with badge */}
            <div className="relative">
              <CartCount/>
              {/* Badge */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
