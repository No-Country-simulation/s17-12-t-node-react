"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

export function SwiperUsers() {
    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={4}
        >
            {
                Array.from({ length: 8 }).map((v, i) => (
                    <SwiperSlide key={i} >
                        <div className="size-20 rounded-full bg-gray-500">
                        </div>
                        <h2 className="text-center">Nombre</h2>
                    </SwiperSlide>
                ))
            }

        </Swiper>
    )
}
