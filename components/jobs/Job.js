import Image from "next/image"
export default function Job({profile, name, title, description, price, stars, onSeeMore}) {
    return (
        <div className="col-span-5 row-span-3 bg-white rounded-lg shadow-md p-2">
            <div className="w-full h-[30%] flex gap-2">
                    <Image
                        src={profile}
                        alt="profile picture"
                        width={20}
                        height={20}
                        className="size-8 rounded-full"
                    />
                <div className="h-full">
                    <h2 className="text-sm font-semibold text-prussian-blue">{name}</h2>
                    <div className="flex">
                        {[...Array(stars)].map((_, i) => (
                            <Image
                                key={i}
                                src="/star-2.svg"
                                alt="star icon"
                                width={10}
                                height={10}
                                className="mr-2"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-full">
                <h1 className="text-lg font-bold text-prussian-blue truncate-lines-2">{title}</h1>
                <p className="text-md text-prussian-blue truncate-lines-2">{description}</p>
                <div className="flex gap-60 pt-2">
                    <h2 className="text-lg font-bold text-ut-orange">${price}</h2>
                    <button className="w-1/2 h-full rounded-lg shadow-lg bg-red-500 bg-ut-orange"
                    onClick={onSeeMore}
                    >
                        See More
                    </button>
                </div>
            </div>
        </div>
    )
}