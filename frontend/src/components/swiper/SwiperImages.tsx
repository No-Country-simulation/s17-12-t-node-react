"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules"

import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from "next/image";
import { PhotoFromAlbum } from "@/interfaces/album";

export function SwiperImages({ images }: { images: PhotoFromAlbum[] }) {
    return (
        <Swiper
            style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff", "--swiper-pagination-bullet-inactive-color": "#fff", "--swiper-pagination-bullet-inactive-opacity": ".4", } as React.CSSProperties}
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={{}}
            className="h-[216px] mt-4 sm:h-[500px]"
            slidesPerView={1}
        >
            {
                images.map((image, i) => (
                    <SwiperSlide key={i} className="relative" >
                        <Image fill src={image.url} alt={image.description} className="object-cover" />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}
