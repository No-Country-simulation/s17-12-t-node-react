"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { ImagesUser } from "@/utils/ImagesUser"
import Image from "next/image"

export function SwiperUsers() {
    return (
        <Swiper
            className="my-4"
            spaceBetween={30}
            slidesPerView={4}
        >
            {
                ImagesUser.map((user, i) => (
                    <SwiperSlide key={i} style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", }}>
                        <Image src={user.url} alt="foto" className="rounded-full object-cover size-20" />
                        <h2 className="text-center flex-col">{user.name}</h2>
                    </SwiperSlide>
                ))
            }

        </Swiper>
    )
}
