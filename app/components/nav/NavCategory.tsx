'use client';

import Link from "next/link"; // Importing Link component from Next.js
import Container from "../Container";
import CategoryNavItem from "./CategoryNavItem";
import { usePathname, useRouter } from "next/navigation"; // Importing usePathname and useRouter hooks from Next.js
import Button from "../Button";


// NavCategory component to render category navigation
const NavCategory = () => {
    // Get the current pathname using usePathname hook
    const pathname = usePathname();

  return (
    <div className="hidden lg:block mt-[-60px] mr-[-390px] lg:mr-0">
        <Container>
            {/* Category navigation links */}
            <div className="flex w-fit gap-10 mx-auto font-medium py-2 text-white">
                <Link href='/Paintings'>
                    <CategoryNavItem label='Paintings' selected={pathname == '/Paintings'}/>
                </Link>

                <Link href='/Photography'>
                    <CategoryNavItem label='Photography' selected={pathname == '/Photography'}/>
                </Link>

                <Link href='/Sculpture'>
                    <CategoryNavItem label='Sculpture' selected={pathname == '/Sculpture'}/>
                </Link>

            </div>
        </Container>      
    </div>
  )
};

export default NavCategory;