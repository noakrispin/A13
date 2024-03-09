import Link from "next/link";
import Container from "../Container";
import { CiHome, CiUser, CiSearch, CiShoppingCart } from "react-icons/ci";
import logo from "./public/logo.png";
import CartCount from "./CartCount";
import { FiHeart } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="sticky top-0 w-full z-30 shadow-sm">
      <Container>
        <div className="text-lg bg-black text-white flex justify-between items-center py-4 relative">
          {/* Left side: Logo and Navigation Links */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src={logo.src} alt="" className="h-8" />
            </Link>
            {/* Navigation Links */}
            <Link href="/" className="flex items-center gap-2"><CiHome />Home</Link>
          </div>
          {/* Middle: Search Box */}
          <div className="flex flex-grow justify-center items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-1"
              />
              {/* Search Button */}
              <div className="absolute right-0 top-0 h-full flex items-center">
                <Link href="/" className='flex items-center gap-2'><CiSearch className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
          {/* Right side: Account and Cart Icons */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2"><CiUser />Hello, User!</Link>
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
