import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from 'react-icons/md';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';

const Footer: React.FC = () => {
  return (
    <footer className=" text-sm mt-16 relative">
      {/* Elliptical background */}
      <div className="absolute inset-0 md:w-1/2">
        <div className="Ellipse1 w-full h-full bg-gradient-to-br from-violet-900 to-transparent bg-opacity-60 rounded-full blur-2xl"></div>
      </div>
      {/* Content */}
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8 relative z-10">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              At Frame of Fame, we make it our mission to help you discover and buy from the best emerging artists around the world.
            </p>
            <p>&copy; {new Date().getFullYear()} Frame of Fame. All rights reserved</p>
          </div>
          <FooterList title="Follow Us">
            <div className="flex gap-2">
              <Link href='#'><MdFacebook size={24} /></Link>
              <Link href='#'><AiFillTwitterCircle size={24} /></Link>
              <Link href='#'><AiFillInstagram size={24} /></Link>
            </div>
          </FooterList>

          <FooterList title="Shop Categories">
            <Link href='#'>Paintings</Link>
            <Link href='#'>Photography</Link>
            <Link href='#'>Sculpture</Link>
          </FooterList>

          <FooterList title="Customer Service">
            <Link href='#'>Contact Us</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Returns</Link>
          </FooterList>

          
          
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
