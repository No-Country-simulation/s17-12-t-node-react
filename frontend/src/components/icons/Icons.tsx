import { FaHome, FaRegImage, FaUser } from "react-icons/fa"
import { IoSearchSharp } from "react-icons/io5";

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

