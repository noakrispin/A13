
import Image from "next/image";
import { CiUser } from "react-icons/ci";

// Define the props interface for the Avatar component
interface AvatarProps{
    src? : string | null | undefined; // Source of the avatar image
}

// Avatar component definition
const Avatar: React.FC <AvatarProps> = ({src}) => {
    if(src){
        // If src is provided, render the Image component with the avatar image
        return(
            <Image 
            src={src}
            alt="Avatar"
            className="rounded-full"
            height='30'
            width='30' />
        )
    }
    // If src is not provided, render the CiUser icon component as the default avatar
    return <CiUser size={20}/>; // Set the size of the CiUser icon
};

export default Avatar;