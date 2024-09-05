import { BackArrow, CardFeed, SwiperUsers } from "@/components";

export default function FeedPage() {

    return (
        <div className="py-8 px-2">
            <BackArrow />

            <SwiperUsers />

            {/* Card  */}
            <CardFeed />

        </div>
    );
}