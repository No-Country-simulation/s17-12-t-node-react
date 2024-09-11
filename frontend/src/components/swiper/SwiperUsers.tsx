"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { User } from "@/interfaces/user"
import Image from "next/image"
import imageAvatar from "/public/image/avatarUser.png"
import "swiper/css"

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
                    <SwiperSlide key={i} style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "minWidth": "80px" } as React.CSSProperties}>
                        <Image src={user.imageUrl || imageAvatar} alt="foto" width={400} height={400} className="rounded-full object-cover size-20" />
                        <h2 className="text-center flex-col">{user.username}</h2>
                    </SwiperSlide>
                ))
            }

        </Swiper>
    )
}
