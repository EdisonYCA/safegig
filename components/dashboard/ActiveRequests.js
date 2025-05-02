import React, { useState, useEffect } from 'react';
import { getJobRequests, completeJob, getPendingJobs, updatePendingJobsStatus, getContractAddress } from "@/library/db/work";
import { useActiveAccount } from "thirdweb/react";
import { useStateContext } from '@/context/StateContext';
import { fetchCompletedRequests } from '@/library/db/work';
import { getContract, defineChain, prepareContractCall, sendTransaction } from "thirdweb";
import { client } from "@/library/thirdwebClient";

const ActiveRequests = () => {
    const [activeRequests, setActiveRequests] = useState([]);
    const { setCompletedRejectedJobs } = useStateContext();
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

    const collectPayment = async (contractAddress) => {
        let contract = null;
        let transaction = null;

        try {
            contract = getContract({
              client,
              chain: defineChain(97),
              address: contractAddress,
            });
          } catch (error) {
            console.error("Failed to get contract instance:", error);
            alert("Failed to connect to the contract. Please check the address and network.");
            return;
          }

          console.log(contract);

          try {
            transaction = await prepareContractCall({
              contract,
              method: "function releasePayment()",
              params: [],
            });
          } catch (error) {
            console.error("Failed to prepare contract call:", error);
            alert("Could not prepare the contract call. Please try again later.");
            return;
          }

          console.log(transaction);

          try {
            const { transactionHash } = await sendTransaction({
              transaction,
              account,
            });
            console.log("Transaction successful! Hash:", transactionHash);
            alert("Payment collected successfully!");
          } catch (error) {
            const message = error?.message || "Unknown error";
            console.error("Transaction failed:", error);
            alert("Transaction failed: " + message);
          }
    }

    const handleCollect = async (jobId) => {
        try {
            // Update the job status in the work document
            await completeJob(jobId, account.address);
            
            // Update the status in the worker's pendingJobs
            await updatePendingJobsStatus(jobId, account.address, "completed");

            // Get the contract address from pendingJobs
            const contractAddress = await getContractAddress(account.address, jobId);
            
            // collect payment
            await collectPayment(contractAddress);
            
            // Refresh the active requests by fetching all job requests and filtering for accepted ones
            const jobRequests = await getJobRequests(account.address);
            const acceptedJobs = jobRequests.filter(job => job.status === "accepted");
            setActiveRequests(acceptedJobs);

            // Refresh completed/rejected jobs
            const completedRequests = await fetchCompletedRequests(account?.address);
            setCompletedRejectedJobs(completedRequests);
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
                                        onClick={() => handleCollect(request.id)}
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