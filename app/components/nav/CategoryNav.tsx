'use client';

import Link from "next/link"; // Importing Link component from Next.js
import Container from "../Container";
import CategoryNavItem from "./CategoryNavItem";
import { usePathname, useRouter } from "next/navigation"; // Importing usePathname and useRouter hooks from Next.js
import Button from "../Button";
import { MdStorefront } from "react-icons/md";
import { HiPaintBrush } from "react-icons/hi2";
import { TbPhoto } from "react-icons/tb";
import { GiSpartanHelmet } from "react-icons/gi";
import { RiNftFill } from "react-icons/ri";

// NavCategory component to render category navigation
const NavCategory = () => {
    // Get the current pathname using usePathname hook
    const pathname = usePathname();

    return (
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
          <Container>
            <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
              <Link href="/app">
                <CategoryNavItem
                  label="All"
                  icon={MdStorefront}
                  selected={pathname === "/app"}
                />
              </Link>
              <Link href="/admin/add-products">
                <CategoryNavItem
                  label="Painting"
                  icon={HiPaintBrush}
                  selected={pathname === "/admin/add-products"}
                />
              </Link>
              <Link href="/admin/manage-products">
                <CategoryNavItem
                  label="Photography"
                  icon={TbPhoto}
                  selected={pathname === "/admin/manage-products"}
                />
              </Link>
              <Link href="/admin/manage-orders">
                <CategoryNavItem
                  label="Sculpture"
                  icon={GiSpartanHelmet}
                  selected={pathname === "/admin/manage-orders"}
                />
              </Link>
              <Link href="/admin/manage-orders">
                <CategoryNavItem
                  label="Nft"
                  icon={RiNftFill}
                  selected={pathname === "/admin/manage-orders"}
                />
              </Link>
            </div>
          </Container>
        </div>
      );
};

export default NavCategory;