import Image from "next/image";

export default function JobDetailModal({ job, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-2xl relative">
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
                        src={job.profile_pic}
                        alt="profile"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                    <div>
                        <h2 className="text-lg font-bold text-prussian-blue">{job.name}</h2>
                        <div className="flex">
                            {[...Array(job.stars)].map((_, i) => (
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

                <h1 className="text-xl font-bold text-prussian-blue mb-2">{job.title}</h1>
                <p className="text-md text-gray-700 mb-4">{job.description}</p>
                <div className="flex gap-60 pt-2">
                    <h2 className="text-lg font-bold text-ut-orange">${job.price}</h2>
                    <button className="w-1/2 h-full rounded-lg shadow-lg bg-blue-green"
                    >
                        Send Work Request
                    </button>
                </div>
            </div>
        </div>
    );
}
