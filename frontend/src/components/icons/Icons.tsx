import { FaHome, FaRegBookmark, FaRegImage, FaUser } from "react-icons/fa"
import { IoLocationSharp, IoSearchSharp } from "react-icons/io5";
import { LuPlusCircle } from "react-icons/lu";

interface IconProps {
    className?: string;
    size?: number
}

export const IconHome = ({ className, size = 30 }: IconProps) => {
    return <FaHome size={size} className={className} />
}
export const IconSearch = ({ className, size = 30 }: IconProps) => {
    return <IoSearchSharp size={size} className={className} />
}
export const IconImage = ({ className, size = 30 }: IconProps) => {
    return <FaRegImage size={size} className={className} />
}
export const IconUser = ({ className, size = 30 }: IconProps) => {
    return <FaUser size={size} className={className} />
}
export const IconPlusCircle = ({ className, size = 30 }: IconProps) => {
    return <LuPlusCircle size={size} className={className} />
}
export const IconBook = ({ className, size = 30 }: IconProps) => {
    return <FaRegBookmark size={size} className={className} />
}
export const IconLocation = ({ className, size = 30 }: IconProps) => {
    return <IoLocationSharp size={size} className={className} />
} 