import Link from "next/link";
import Container from "../Container";
import logo from "./public/logo.png";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import getCurrentUser from "@/actions/getCurrentUser";
import SearchInput from "./SearchInput";
import Categories from "./Categories";
import ThemeBtn from "../ThemeBtn";

const Navbar = async () => {

  const currentUser= await getCurrentUser();


  return (
    <div className="top-0 w-full z-30 shadow-sm">
      <Container>
        <div className="text-lg flex flex-col sm:flex-row justify-between items-center py-4 relative">
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
          {/*className="hidden md:block" */}
          <div > 
            <SearchInput/>
          </div>
          {/* Right side: Account and Cart Icons */}
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="/" className="flex items-center gap-2"><UserMenu currentUser={currentUser}/></Link>
            {/* Cart Icon with badge */}
            <div className="relative">
              <CartCount/>
              {/* Badge */}
            </div>
            <ThemeBtn/>
          </div>
        </div>
      </Container>
      <Categories/> 
    </div>
 
  );
};

export default Navbar;