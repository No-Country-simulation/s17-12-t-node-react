"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"

import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ImagesAlbum } from "@/utils";
import Image from "next/image";

export function SwiperImages() {
    return (
        <Swiper
            modules={[Pagination, Navigation]}
            pagination
            navigation={{}}
            className="h-[216px] mt-4"
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
