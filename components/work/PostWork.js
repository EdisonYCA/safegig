import { useState } from 'react';
import { postWork, updatePostedWork } from '@/library/db/work';
import { useActiveAccount } from 'thirdweb/react';
import { useStateContext } from '@/context/StateContext';

export default function PostWork(){
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        payment: '',
        timeline: ''
    });
    const [confirmation, setConfirmation] = useState(false);
    const {setContent} = useStateContext();

    const account = useActiveAccount();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jobId = await postWork(account.address, formData.payment, formData.timeline,
                formData.title, formData.description
            );
            
            await updatePostedWork(jobId, account.address);

            setConfirmation(true);

            setFormData({
                title: '',
                description: '',
                payment: '',
                timeline: ''
            });
            
        } catch (error) {
            console.error('Error posting work:', error);
            alert('Failed to post work. Please try again.');
        }
    };

    return (
        <div className="col-span-8 row-start-3 bg-gray-100 row-span-13 rounded-lg flex flex-col p-3 gap-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">Post New Work</h2>
            {confirmation ? (
                <div className="text-green-600">
                    Work posted successfully!
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="placeholder:text-gray-400 text-prussian-blue px-3 py-2 border border-gray-300 bg-white rounded-md"
                            placeholder="Enter work title"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="placeholder:text-gray-400 px-3 text-prussian-blue py-2 border border-gray-300 rounded-md bg-white"
                            placeholder="Describe the work in detail"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="payment" className="text-sm font-medium text-gray-700">Proposed Payment ($)</label>
                        <input
                            type="number"
                            id="payment"
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="placeholder:text-gray-400 px-3 py-2 text-prussian-blue border border-gray-300 rounded-md bg-white"
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="timeline" className="text-sm font-medium text-gray-700">Proposed Timeline (days)</label>
                        <input
                            type="number"
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            min="1"
                            className="placeholder:text-gray-400 px-3 py-2 border text-prussian-blue border-gray-300 rounded-md bg-white"
                            placeholder="Enter number of days"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-ut-orange text-white rounded-md hover:scale-101 transition"
                    >
                        Post Work
                    </button>
                </form>
            )}
        </div>
    );
}