import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import Image from 'next/image';

import { CiHome,CiUser,CiSearch,CiShoppingCart    } from "react-icons/ci";
import logo from "./public/logo.png"


const Navbar = () => {
  return (
    <div className="    
    sticky
    top-0
    w-full
    z-30
    shadow-sm">
      <Container>
        <div className="text-lg text-white flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
              {/* Left side: Logo and Navigation Links */}
              <Link href="/">
                <Image src={logo.src} alt="" className="h-8"/>
              </Link>
              {/* Navigation Links */}
              <Link href="/" className="flex items-center gap-2"><CiHome/>Home
              </Link>
              <Link href="/" className="flex items-center gap-2"><CiUser/>Account
              </Link>
              
              <Link href="/" className="flex items-center gap-2"><CiShoppingCart/>Cart
              </Link>
          </div>
          {/* Right side: Search Icon */}
          <div className="text-sm text-white  items-center gap-4  md:block">
            {/* Search Box */}
            <div className="relative">
              <input 
              type="text" 
              placeholder="Search..." 
              className="m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-1 w-32" />
              {/* Search Button */}
              <div className="absolute right-0 top-0 h-full flex items-center">
                <Link href="/" className='flex items-center gap-2'><CiSearch className="h-4 w-4"/></Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
