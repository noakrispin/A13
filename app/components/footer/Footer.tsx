import Link from "next/link";
import Container from "../container";
import FooterList from "./FooterList";

import {MdFacebook} from 'react-icons/md';
import {AiFillInstagram, AiFillTwitterCircle} from 'react-icons/ai';

 const Footer = () => {
  return (
    <footer className="
    bg-violet-950
    text-slate-200 
    text-sm 
    mt-16">
      <Container>
        <div className="flex
        flex-col
        md:flex-row
        justify-between
        pt-16
        pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href='#'>Paintings</Link>
            <Link href='#'>Photography</Link>
            <Link href='#'>Sculpture</Link>
          </FooterList>

          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link href='#'>Contact Us</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Returns</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-base font-bold mb-2">About Us</h3>
          <p className="mb-2">
          At Frame of Fame, 
          we make it our mission to help you discover 
          and buy from the best emerging artists around the world.
          </p>
          <p>&copy; {new Date().getFullYear()} 
          Frame of Fame. All rights reserved</p>
          </div>
          <FooterList>
          <h3 className="text-base font-bold mb-2">Follow Us</h3>
          <div className="flex gap-2">
          <Link href='#'>
            <MdFacebook size={24}/>
          </Link>
          <Link href='#'>
            <AiFillTwitterCircle size={24}/>
          </Link>
          <Link href='#'>
            <AiFillInstagram size={24}/>
          </Link>
          </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  )
}

export default Footer