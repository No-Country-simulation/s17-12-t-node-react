"use client"

import imageAvatar from "/public/image/avatarUser.png"
import { Swiper, SwiperSlide } from "swiper/react"
import { User } from "@/interfaces/user"
import Image from "next/image"
import Link from "next/link"
import "swiper/css"
import { useState } from "react"
import { UsersSkeleton } from "@/ui/skeleton/usersSkeleton"

export function SwiperUsers({ users }: { users: User[] }) {
    const [loading, setLoading] = useState(true);

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
                    <SwiperSlide key={i} style={{ "display": "flex", "alignItems": "start", "minWidth": "80px", "overflow": "hidden", "justifyContent": "space-between" } as React.CSSProperties}>
                        <Link href={'/perfil/' + user._id}>
                            <Image
                                src={user.imageUrl || imageAvatar}
                                alt="foto"
                                width={400}
                                height={400}
                                className="rounded-full object-cover size-20 mx-auto"
                                onLoad={() => setLoading(false)}
                            />
                            <h2 className="text-center flex-col truncate text-TextPrimary font-semibold">{user.username}</h2>
                        </Link>
                        {loading && (
                            Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className="flex flex-col gap-2 justify-center items-center">
                                    <div className="size-20 bg-gray-400 rounded-full animate-pulse" />
                                    <div className="h-4 w-20 bg-gray-400 rounded-full animate-pulse" />
                                </div>
                            )
                            )
                        )}
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

