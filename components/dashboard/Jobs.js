import Image from "next/image";

export default function Jobs(){
    return (
        <div className="grid grid-cols-4 grid-rows-4 row-start-2 col-start-3 row-span-full col-span-full bg-gray-100 rounded-lg p-3 shadow-md">
            <div className="col-span-full flex justify-center px-15 pb-25">
                <div className="w-full flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
                    <Image
                        src="/zoom-3.svg"
                        alt="search icon"
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    <input
                    type="text"
                    placeholder="Search gigs..."
                    className="w-full outline-none text-sm text-prussian-blue placeholder-prussian-blue"
                    />
                </div>
            </div>
        </div>
    );
}