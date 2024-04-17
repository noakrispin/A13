"use client";

// Import necessary modules and components
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/Utils/categories";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref,uploadBytesResumable} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { colors } from "@/Utils/Colors";
import SelectCategory from "@/app/components/inputs/SelectCategory";


// Define types for image and uploaded image
export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

// Define AddProductForm component
const AddProductForm = () => {
  
  // State variables
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  
  // Initialize React hook form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      Size: "", 
      Artist_Name: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });


  // useEffect hook to reset form and images state when product is created
  useEffect(() => {setCustomValue("images", images);    
  }, [images]); //

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated,reset,setImages]); //reset

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product Data", data);
    // upload images to fb
    //save product to mongodb
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected!");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected image!");
    }
    // Function to handle image uploads to Firebase Storage
    const handleImageUploads = async () => {
      toast("Creating product, please wait..");
      try {
        // Loop through each image in data.images
        for (const item of data.images) {
          if (item.image) {
            // Upload image to Firebase Storage
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
            // Monitor upload progress and get download URL
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      // Add uploaded image data to uploadedImages array
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the download URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("Error handling image uploads");
      }
    };
    // Handle image uploads
    await handleImageUploads();
    // Prepare product data with uploaded image URLs
    const productData = { ...data, images: uploadedImages };

    // Send product data to backend API for saving to MongoDB
    axios
      .post("/api/product", productData).then(() => {
        toast.success("Product created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong when saving product to db");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Watch category selection
  const category = watch("category");

  // Function to set custom form value
  const setCustomValue = useCallback((id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  },
  [setValue]
);

  // Function to add image to state
  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, [setImages]);

  // Function to remove image from state
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color != value.color
        );
        return filteredImages;
      }

      return prev;
    });
  }, [setImages]);


  // Render form components
  return (
    <>
      {/* Heading for the form */}
      <Heading title="Add a Product" center/>
      {/* Input fields for Name, Price, Artist Name, Size, and Description */}
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="Artist_Name"
        label="Artist Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="Size"
        label="Size"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
       {/* Checkbox for indicating whether the product is in stock */}
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This product is in stock"
      />
      {/* Category selection */}
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto ">
            {categories.map((item) => {
              if (item.label === 'All') {
                return null;
              }

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Image upload section */}
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold ">
            Upload image of your artwork.
          </div>
          <div className="text-sm  ">
            First, you must commit that the creation is yours alone in order to avoid copyright infringement.
          </div>
        </div>
        <div className=" gap-3">
          {/* Render SelectColor component for each color */}
          {colors.map((item, index) => {
            return (
              <SelectCategory
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
                
                
              />
            );
          })}
        </div>
      </div>
      {/* Button for submitting the form */}
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
