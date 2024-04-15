'use client'

// Import necessary types and hooks
import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

// Define props interface for SelectImage component
interface SelectImageProps {
  item?: ImageType; // Image item object (optional)
  handleFileChange: (value: File) => void; // Function to handle file change
}

// Define SelectImage component
const SelectImage: React.FC<SelectImageProps> = ({item,handleFileChange}) => {
  
  // Callback function for handling file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // If files are accepted, call handleFileChange with the first accepted file
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }, [handleFileChange]);

  // useDropzone hook to handle file drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, // Callback function for file drop
    accept: { "image/*": [".jpeg", ".png"] }, // Accept only image files with .jpeg and .png extensions
  });

  // Render SelectImage component
  return (
    <div
      {...getRootProps()} // Props for the root element of the drop zone
      className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center"
    >
      <input {...getInputProps()} /> {/* Props for the input element */}
      {/* Render text for indicating drop area */}
      {isDragActive ? (<p>Drop the image here...</p>) : (<p>{item?.color} Image</p>)} {/** */}
      
    </div>
  );
};

export default SelectImage; // Export SelectImage component
