// Import necessary icons from react-icons
import { MdStorefront } from "react-icons/md";
import { FaPaintbrush } from "react-icons/fa6";
import { TbPhoto } from "react-icons/tb";
import { GiSpartanHelmet } from "react-icons/gi";
import { RiNftFill } from "react-icons/ri";

// Define an array of categories
export const categories = [
  {
    label: "All", // Label for the category
    icon: MdStorefront, // Icon component for the category
  },
  {
    label: "Painting", // Label for the category
    icon: FaPaintbrush, // Icon component for the category
  },
  {
    label: "Photography", // Label for the category
    icon: TbPhoto, // Icon component for the category
  },
  {
    label: "Sculpture", // Label for the category
    icon: GiSpartanHelmet, // Icon component for the category
  },
  {
    label: "Nft", // Label for the category
    icon: RiNftFill, // Icon component for the category
  },
];
