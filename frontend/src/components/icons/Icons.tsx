import { BsChatDots } from "react-icons/bs";
import { FaBookmark, FaHeart, FaHome, FaRegBookmark, FaRegHeart, FaRegImage, FaUser } from "react-icons/fa"
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoLocationSharp, IoSearchSharp, IoSettingsSharp } from "react-icons/io5";
import { LiaPaperPlaneSolid } from "react-icons/lia";
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
export const IconPlusCircle = ({ className, size = 60 }: IconProps) => {
    return <LuPlusCircle size={size} className={className} />
}
export const IconBook = ({ className, size = 30 }: IconProps) => {
    return <FaRegBookmark size={size} className={className} />
}
export const IconBookLleno = ({ className, size = 30 }: IconProps) => {
    return <FaBookmark size={size} className={className} />
}
export const IconLocation = ({ className, size = 30 }: IconProps) => {
    return <IoLocationSharp size={size} className={className} />
}
export const IconCorazon = ({ className, size = 30 }: IconProps) => {
    return <FaRegHeart size={size} className={className} />
}
export const IconCorazonLleno = ({ className, size = 30 }: IconProps) => {
    return <FaHeart size={size} className={className} />
}
export const IconChat = ({ className, size = 30 }: IconProps) => {
    return <BsChatDots size={size} className={className} />
}
export const IconPaper = ({ className, size = 30 }: IconProps) => {
    return <LiaPaperPlaneSolid size={size} className={className} />
}
export const IconFlechaAtras = ({ className, size = 30 }: IconProps) => {
    return <IoMdArrowRoundBack size={size} className={className} />
}
export const IconConfig = ({ className, size = 30 }: IconProps) => {
    return <IoSettingsSharp size={size} className={className} />
} 