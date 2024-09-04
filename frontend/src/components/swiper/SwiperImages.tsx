"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import { ImagesAlbum } from "@/utils";
import Image from "next/image";

export function SwiperImages() {
    return (
        <Swiper
            className="h-[250px] mt-4"
            slidesPerView={1}
        >
            {
                ImagesAlbum.map((image, i) => (
                    <SwiperSlide key={i} className="relative">
                        <Image src={image.url} alt="foto" className="object-cover h-full w-full" />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}
