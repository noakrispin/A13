'use client';

import Link from "next/link"; // Importing Link component from Next.js
import Container from "../Container";
import CategoryNavItem from "./CategoryNavItem";
import { usePathname } from "next/navigation"; // Importing usePathname hook from Next.js
import paintImg from "@/Utils/pool17.jpg";
import photograpfImg from "@/Utils/photograph.jpg";
import sculpImg from "@/Utils/sculp.jpg";
import nftImg from "@/Utils/nft.jpg";

// NavCategory component to render category navigation
const NavCategory = () => {
    // Get the current pathname using usePathname hook
    const pathname = usePathname();

    return (
        <div className="w-full shadow-sm top-20 pt-4">
          <Container>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Link href="/admin/add-products">
                        <CategoryNavItem
                            label="Painting"
                            imageUrl={paintImg.src}
                        />
                    </Link>
                    <Link href="/admin/manage-products">
                        <CategoryNavItem
                            label="Photography"
                            imageUrl={photograpfImg.src}
                        />
                    </Link>
                    <Link href="/product/nft">
                        <CategoryNavItem
                            label="Sculpture"
                            imageUrl={sculpImg.src}
                        />
                    </Link>
                    <Link href="/product/nft">
                        <CategoryNavItem
                            label="NFT"
                            imageUrl={nftImg.src}
                        />
                    </Link>
                </div>
            </div>
          </Container>
        </div>
    );
};

export default NavCategory;
