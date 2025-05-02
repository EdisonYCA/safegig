import Image from "next/image"

export default function WorkPosting({ client, title, description, price, stars, onSeeMore, timeline }) {
    return (
        <div className="w-1/3 h-1/2 bg-prussian-blue rounded-lg shadow-md p-4 flex flex-col">
            {/* Client Info */}
            <div className="flex gap-2 mb-2">
                <img
                    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${client}`}
                    alt="profile picture"
                    className="size-8 rounded-full"
                />
                <div>
                    <h2 className="text-sm font-semibold text-white">{client.slice(0, 30)}...</h2>
                    <div className="flex">
                        {[...Array(stars)].map((_, i) => (
                            <Image
                                key={i}
                                src="/star-2.svg"
                                alt="star icon"
                                width={10}
                                height={10}
                                className="mr-1"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Title and Description */}
            <div className="flex-grow">
                <h1 className="text-lg font-bold text-white truncate">{title}</h1>
                <p className="text-sm text-white line-clamp-5">{description}</p>
            </div>

            {/* Price, Timeline, Button */}
            <div className="mt-3 pt-2 border-t border-white/20 flex justify-between items-center">
                <div>
                    <h2 className="text-sm text-white">Proposed Payment</h2>
                    <h2 className="text-xl font-bold text-ut-orange">${price}</h2>
                </div>
                <div>
                    <h2 className="text-sm text-white">Timeline</h2>
                    <h2 className="text-xl font-bold text-ut-orange">{timeline}</h2>
                </div>
                <button
                    className="rounded-lg px-4 py-2 text-sm font-semibold bg-ut-orange hover:scale-105 transition"
                    onClick={onSeeMore}
                >
                    See More
                </button>
            </div>
        </div>
    )
}