import Image from "next/image";
import { CiUser } from "react-icons/ci";

interface AvatarProps{
    src? : string | null | undefined
}

const Avatar: React.FC <AvatarProps> = ({src}) => {
    if(src){
        return(
            <Image 
            src={src}
            alt="Avatar"
            className="rounded-full"
            height='30'
            width='30' />
        )
    }
    return <CiUser size={20}/>;
};

export default Avatar;