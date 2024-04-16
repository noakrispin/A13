'use client';

import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import Avatar from "../Avatar";

interface UserMenuProps{
    currentUser: SafeUser | null;
}


const UserMenu: React.FC<UserMenuProps>=({currentUser}) => {
    
    // State to manage the open/close state of the menu
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the open/close state of the menu
    const toggleOpen=useCallback(()=>{
        setIsOpen(prev => !prev);
    },[]);

    return (
    <>
        <div className="relative z-30">
            {/* User menu button */}
            <div onClick={toggleOpen} className="
            p-2
            border-[1px]
            border-slate-400
            flex
            flex-row
            items-center
            gap-1
            rounded-full
            cursor-pointer
            hover:shadow-md
            hover:shadow-white
            transition
            ">
                <Avatar/>
                <AiFillCaretDown />

            </div>
            {/* Menu items */}
            {isOpen && (
                <div className="absolute
                rounded-md
                shadow-md
                w-[170px]
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                flex
                flex-col
                cursor-pointer
                ">
                    {currentUser ? (
                        <div>
                            {/* Link to user orders */}
                            <Link href="/orders">
                                <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                            </Link>
                            {/* Link to admin dashboard */}
                            <Link href="/admin">
                                <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                            </Link>
                            <hr />
                            {/* Logout option */}
                            <MenuItem onClick={()=>{
                                toggleOpen();
                                signOut();
                            }}> Logout</MenuItem>
                        </div>) : <div>
                        {/* Link to login */}
                        <Link href="/login">
                            <MenuItem onClick={toggleOpen}>Login</MenuItem>
                        </Link>
                        {/* Link to register */}
                        <Link href="/register">
                            <MenuItem onClick={toggleOpen}>Register</MenuItem>
                        </Link>
                    </div>
                    }


                </div>
            )}
        </div>
        {/* Backdrop to close the menu when clicked outside */}
        {isOpen ? <BackDrop onClick={toggleOpen}/> : null}
    </>
  );
};

export default UserMenu;