import Image from "next/image";
import { useState } from "react";

export default function GigDetailModal({ gig, onClose }) {
    const gigForm = (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-1/2 h-[70%] rounded-lg shadow-lg p-6 max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                >
                    <Image
                        src="/s-remove.svg"
                        alt="search icon"
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                </button>
                
                <h1 className="font-bold text-4xl text-selective-yellow mb-5">Buy This Gig</h1>
                <div className="flex items-center w-full h-full">
                    <form className="w-full h-full flex flex-col gap-3">
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-bold text-prussian-blue">Your Application</label>
                            <textarea className="h-30 text-sm border rounded-lg p-2 text-prussian-blue border-gray-500 placeholder-prussian-blue placeholder:align-top resize-none" type="text" placeholder="Example: would you make a logo for me?"></textarea>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-bold text-prussian-blue">Proposed Budget</label>
                            <input className="text-sm border rounded-lg p-2 text-prussian-blue border-gray-500 placeholder-prussian-blue" type="text" placeholder="$50"></input>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-bold text-prussian-blue">Proposed Timeline</label>
                            <input className="text-sm border rounded-lg p-2 text-prussian-blue border-gray-500 placeholder-prussian-blue" type="text" placeholder="3 weeks"></input>
                        </div>
                        <div className="flex flex-col w-full h-1/2 gap-2 mt-5">
                            <button className="w-full h-1/2 bg-ut-orange rounded-lg">Submit Application</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )

    const gigDetails = (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                >
                    <Image
                        src="/s-remove.svg"
                        alt="search icon"
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                </button>

                <div className="flex items-center gap-4 mb-4">
                    <Image
                        src={gig.profile_pic}
                        alt="profile"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                    <div>
                        <h2 className="text-lg font-bold text-prussian-blue">{gig.name}</h2>
                        <div className="flex">
                            {[...Array(gig.stars)].map((_, i) => (
                                <Image
                                    key={i}
                                    src="/star-2.svg"
                                    alt="star icon"
                                    width={12}
                                    height={12}
                                    className="mr-1"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <h1 className="text-xl font-bold text-prussian-blue mb-2">{gig.title}</h1>
                <p className="text-md text-gray-700 mb-4">{gig.description}</p>
                <div className="flex justify-between pt-2">
                    <h2 className="text-lg font-bold text-ut-orange">${gig.price}/hr</h2>
                    <button onClick={() => (setModalContent(gigForm))} className="w-[20%] h-full rounded-lg shadow-lg bg-red-500 bg-ut-orange hover:scale-105"
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
        )

    const [modalContent, setModalContent] = useState(gigDetails);

    return (
        modalContent
    );
}
