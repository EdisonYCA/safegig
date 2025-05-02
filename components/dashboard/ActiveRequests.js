import React, { useState, useEffect } from 'react';
import { getJobRequests, completeJob, getPendingJobs, updatePendingJobsStatus } from "@/library/db/work";
import { useActiveAccount } from "thirdweb/react";

const ActiveRequests = () => {
    const [activeRequests, setActiveRequests] = useState([]);
    const account = useActiveAccount();

    useEffect(() => {
        if (!account) return;

        const fetchActiveRequests = async () => {
            try {
                const jobRequests = await getJobRequests(account.address);
                const acceptedJobs = jobRequests.filter(job => job.status === "accepted");
                setActiveRequests(acceptedJobs);
            } catch (error) {
                console.error('Error fetching active requests:', error);
                setActiveRequests([]);
            }
        };

        fetchActiveRequests();
    }, [account]);

    const handleCollect = async (jobId, proposalId) => {
        try {
            // Update the job status in the work document
            await completeJob(jobId, account.address);
            
            // Update the status in the worker's pendingJobs
            await updatePendingJobsStatus(jobId, proposalId, account.address, "completed");
            
            // Refresh the active requests
            const jobRequests = await getJobRequests(account.address);
            const acceptedJobs = jobRequests.filter(job => job.status === "accepted");
            setActiveRequests(acceptedJobs);
        } catch (error) {
            console.error('Error completing job:', error);
        }
    };

    const formatText = (text, maxLength = 20) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const formatWalletAddress = (address) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    const getRemainingDays = (endDate) => {
        const today = Math.floor(Date.now() / 1000);
        const diffInSeconds = endDate - today;
        const diffInDays = Math.ceil(diffInSeconds / (24 * 60 * 60));
        return diffInDays;
    };

    const getStatusColor = (days) => {
        if (days <= 0) return 'bg-red-900';
        if (days <= 2) return 'bg-red-700';
        if (days <= 5) return 'bg-red-500';
        if (days <= 7) return 'bg-red-300';
        return 'bg-green-500';
    };

    return (
        <div className="space-y-4">
            {activeRequests.length === 0 ? (
                <p className="text-white/80">No active requests</p>
            ) : (
                activeRequests.map((request) => {
                    const dueDate = request.paymentDate;
                    const remainingDays = dueDate ? getRemainingDays(dueDate) : 0;
                    const statusColor = getStatusColor(remainingDays);
                    
                    return (
                        <div key={request.id} className="bg-white/10 p-3 rounded-lg shadow-sm border border-white/20">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm text-white">{formatText(request.title)}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full text-white ${statusColor}`}>
                                    {remainingDays > 0 ? `${remainingDays} days` : 'Due'}
                                </span>
                            </div>
                            <div className="flex items-center mt-2">
                                <div className="relative w-6 h-6 mr-2">
                                    <img
                                        src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${request.client}`}
                                        alt="Client avatar"
                                        className="rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-white/80">{formatWalletAddress(request.client)}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-semibold text-ut-orange">${request.proposedPrice}</span>
                                <span>
                                    <button 
                                        className={`text-xs px-2 py-1 rounded-full text-white ${remainingDays === 0 ? 'bg-ut-orange' : 'bg-gray-500 cursor-not-allowed'}`}
                                        disabled={remainingDays !== 0}
                                        onClick={() => handleCollect(request.id, request.proposalId)}
                                    >
                                        Collect
                                    </button>
                                </span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ActiveRequests; 