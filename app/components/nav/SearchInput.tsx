"use client";

 import { useRouter } from "next/navigation";
//import { useRouter } from "next/router";  Changed import statement
import { CiSearch } from 'react-icons/ci';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import queryString from 'query-string';

// SearchInput component definition
const SearchInput = () => {

  // Initialize the useRouter hook
  const router=useRouter();

  // Initialize the useForm hook to handle form state and submission
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  }=useForm<FieldValues>({
    defaultValues: {
      searchTerm: ''
    }
  });
  
  // Define the onSubmit handler function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) {
      return router.push('/');
    }
  
    const url = queryString.stringifyUrl({
      url: '/',
      query: {
        searchTerm: data.searchTerm
      }
    },{ skipNull: true });
  
    router.push(url);
    reset();
  }

  return (
    <div className="flex flex-grow justify-center items-center mt-4 sm:mt-0"> 
      <div className="relative">
      <input
        {...register('searchTerm')}
        autoComplete="off"
        type="text"
        placeholder="Search..."
        className="block min-w-0 flex-auto rounded border border-solid border-neutral-300
         bg-transparent bg-clip-padding px-2 py-1
         focus:bourder-[0.5px] focus:border-white"
        />
        <button onClick={handleSubmit(onSubmit)} className="absolute right-1 top-0 h-full flex items-center">
          {/* Render the search icon */}
          <CiSearch className="h-5 w-5" /></button>
      </div>
    </div>
  );
}

export default SearchInput;