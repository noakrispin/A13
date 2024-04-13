// Import necessary types and components
import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

// Define props interface for SelectCategory component
interface SelectCategoryProps {
  item: ImageType; // category item object
  addImageToState: (value: ImageType) => void; // Function to add image to state
  removeImageFromState: (value: ImageType) => void; // Function to remove image from state
  isProductCreated: boolean; // Boolean indicating if product is created
}

// Define SelectCategory component
const SelectCategory: React.FC<SelectCategoryProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  // State to track if category is selected
  const [isSelected, setIsSelected] = useState(false);
  // State to track selected file
  const [file, setFile] = useState<File | null>(null);

  // Reset selected category and file when product is created
  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  // Handle file change
  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, [addImageToState, item]);//

  // Handle checkbox change
  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);

    if (!e.target.checked) {
      setFile(null);
      removeImageFromState(item);
    }
  }, [removeImageFromState, item]); //

  // Render SelectCategory component
  return (
    <div className="grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        {/* Checkbox for selecting category */}
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        {/* Label for color */}
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      {/* Conditional rendering based on selection */}
      <>
        {/* Render SelectImage component if category is selected and no file is chosen */}
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {/* Render file name and cancel button if file is chosen */}
        {file && (
          <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
            <p>{file?.name}</p>
            <div className="w-70px">
              {/* Cancel button */}
              <Button
                label="Cancel"
                small
                outline
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectCategory; // Export SelectCategory component
