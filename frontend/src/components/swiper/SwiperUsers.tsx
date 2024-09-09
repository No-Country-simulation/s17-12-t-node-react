"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { User } from "@/interfaces/user"
import Image from "next/image"
import "swiper/css"

export function SwiperUsers({ users }: { users: User[] }) {
    return (
        <Swiper
            className="my-4"
            spaceBetween={30}
            slidesPerView={4}
        >
            {
                users.map((user, i) => (
                    <SwiperSlide key={i} style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", }}>
                        <Image src={user.imageUrl} alt="foto" width={400} height={400} className="rounded-full object-cover size-20" />
                        <h2 className="text-center flex-col">{user.username}</h2>
                    </SwiperSlide>
                ))
            }

        </Swiper>
    )
}
