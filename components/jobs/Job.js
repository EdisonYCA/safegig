import Image from "next/image"
export default function Job() {
    return (
        <div className="col-span-5 row-span-3 bg-white rounded-lg shadow-md p-2">
            {/* Profile */}
            <div className="w-full h-[30%] flex gap-2">
                <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full"
                />
                <div className="h-full">
                    <h2 className="text-sm font-semibold text-prussian-blue">Alex Ryan</h2>
                    <div className="flex">
                        <Image
                            src="/star-2.svg"
                            alt="star icon"
                            width={10}
                            height={10}
                            className="mr-2"
                        />
                        <Image
                            src="/star-2.svg"
                            alt="star icon"
                            width={10}
                            height={10}
                            className="mr-2"
                        />
                        <Image
                            src="/star-2.svg"
                            alt="star icon"
                            width={10}
                            height={10}
                            className="mr-2"
                        />
                        <Image
                            src="/star-2.svg"
                            alt="star icon"
                            width={10}
                            height={10}
                            className="mr-2"
                        />
                        <Image
                            src="/star-2.svg"
                            alt="star icon"
                            width={10}
                            height={10}
                            className="mr-2"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full h-full">
                <h1 className="text-lg font-bold text-prussian-blue">Logo Editor's Needed</h1>
                <p className="text-md text-prussian-blue">We are seeking experienced Logo Editors to join our creative team. As a Logo Editor, you will have the opportunity to join...</p>
                <div className="flex gap-60 pt-2">
                    <h2 className="text-lg font-bold text-ut-orange">$5000</h2>
                    <button className="w-1/2 h-full rounded-lg shadow-lg bg-red-500 bg-ut-orange">
                        See More
                    </button>
                </div>
            </div>
        </div>
    )
}