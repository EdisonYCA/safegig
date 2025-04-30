import Image from "next/image";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";

export default function JobDetailModal({ job, onClose }) {
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [price, setPrice] = useState(job.price);
    const [timeline, setTimeline] = useState(job.timeline);
    const [message, setMessage] = useState("");
    const account = useActiveAccount();

    const handleSubmit = async () => {
        try {
            await updateProposals(job.id, account.address, price, timeline, message);
    
            setShowForm(false);
            setShowConfirmation(true);
        } catch (error) {
            console.error("Error submitting proposal:", error);
        }
    };

    return (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                <div className="bg-prussian-blue rounded-2xl shadow-xl p-6 w-full max-w-lg relative flex flex-col gap-4">
                                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-ut-orange transition"
                    >
                        <Image
                            src="/s-remove.svg"
                            alt="close icon"
                            width={24}
                            height={24}
                        />
                    </button>
                    {!showConfirmation && (
                        <>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                                <p className="text-base text-white leading-relaxed">{job.description}</p>
                            </div>
                        {!showForm ? (
                            <div className="flex justify-end pt-4">
                                <button
                                    className="bg-ut-orange text-white font-semibold px-6 py-2 rounded-xl hover:scale-105 transition"
                                    onClick={() => setShowForm(true)}
                                >
                                    Interested
                                </button>
                            </div>
                        ) : (
                            <form className="flex flex-col gap-3 pt-4">
                                <input
                                    type="number"
                                    placeholder="Propose a new price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="bg-white rounded-lg px-4 py-2 text-sm text-black"
                                />
                                <input
                                    type="text"
                                    placeholder="Propose a new timeline"
                                    value={timeline}
                                    onChange={(e) => setTimeline(e.target.value)}
                                    className="bg-white rounded-lg px-4 py-2 text-sm text-black"
                                />
                                <textarea
                                    placeholder="Leave a message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="bg-white rounded-lg px-4 py-2 text-sm text-black"
                                    rows={3}
                                />
                                <div className="flex justify-between pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:scale-105 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="bg-ut-orange text-white font-semibold px-4 py-2 rounded-lg hover:scale-105 transition"
                                    >
                                        Submit Proposal
                                    </button>
                                </div>
                            </form>
                        )}
        </>
    )}
                {showConfirmation && (
                    <p className="text-white text-center font-bold">
                        Proposal submitted successfully!
                    </p>
                )}
                </div>
            </div>
        );
}
