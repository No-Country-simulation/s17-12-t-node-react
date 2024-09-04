import { IconLocation } from "../icons";
import { SwiperImages } from "../swiper/SwiperImages";

export function CardFeed() {
    return (
        <div className="my-8">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="size-11 rounded-full bg-gray-500" />
                    <h2>Aventura</h2>
                </div>
                <div className="flex items-center">
                    <IconLocation />
                    <h2>Location</h2>
                </div>
            </div>

            <SwiperImages />


        </div>
    )
}
