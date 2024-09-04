import { CardFeed } from "@/components";

export default function FeedPage() {

    return (
        <div className="my-8">
            <div className="flex gap-4">
                {
                    Array.from({ length: 8 }).map((v, i) => (
                        <div key={i}>
                            <div className="size-20 rounded-full bg-gray-500" />
                            <h2>Nombre</h2>
                        </div>
                    ))
                }
            </div>

            {/* Card  */}
            <CardFeed />

        </div>
    );
}