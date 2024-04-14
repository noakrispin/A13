"use client";

import qs from 'query-string'
//import { Search } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Search } from 'lucide-react';

const SerchInput = () => {
  const searchParams = useSearchParams();
  const title = searchParams?.get('title');
  const [value,setValue]= useState(title || '');

  const pathname= usePathname();
  const router = useRouter()


  useEffect(()=>{
    const query ={
      title: value
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    },{skipNull: true, skipEmptyString: true})

    router.push(url);
  },[value,router])
  const onChange: ChangeEventHandler<HTMLInputElement> = (e)=> {
    setValue(e.target.value)
  }

  if (pathname != '/')
    return null;

  return (
    <div className="flex flex-grow justify-center items-center mt-4 sm:mt-0"> 
      <div className="relative">
      <Search className="absolute right-1 top-0 h-full flex items-center"/>
      <input
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className="block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-1"
        />
      </div>
    </div>
  );
}

export default SerchInput;