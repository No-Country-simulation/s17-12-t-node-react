"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { User } from "@/interfaces/user"
import Image from "next/image"
import imageAvatar from "/public/image/avatarUser.png"
import "swiper/css"
import Link from "next/link"

export function SwiperUsers({ users }: { users: User[] }) {
    return (
        <Swiper
            className="my-4"
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
                450: {
                    slidesPerView: 4
                }
            }}
        >
            {
                users.map((user, i) => (
                    <SwiperSlide key={i} style={{ "display": "flex", "flexDirection": "column", "alignItems": "start", "minWidth": "80px", "overflow": "hidden" } as React.CSSProperties}>
                        <Link href={'/perfil/' + user._id}>
                            <Image src={user.imageUrl || imageAvatar} alt="foto" width={400} height={400} className="rounded-full object-cover size-20" />
                            <h2 className="text-center flex-col truncate text-TextPrimary font-semibold">{user.username}</h2>
                        </Link>
                    </SwiperSlide>
                ))
            }

        </Swiper>
    )
}
