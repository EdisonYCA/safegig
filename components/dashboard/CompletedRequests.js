import React, { useEffect } from 'react';
import { fetchCompletedRequests } from '@/library/db/work';
import { useActiveAccount } from 'thirdweb/react';
import { useStateContext } from '@/context/StateContext';

const CompletedRequests = () => {
    const account = useActiveAccount();
    const { completedRejectedJobs, setCompletedRejectedJobs } = useStateContext();
    useEffect(() => {
        if (account === undefined) return;
        const fetchData = async () => {
            const completedRequests = await fetchCompletedRequests(account?.address);
            setCompletedRejectedJobs(completedRequests);
        }
        fetchData();
    }, [account]);

    const getStatusColor = (status) => {
        return status === "Completed" ? "bg-green-500" : "bg-red-500";
    };

    const getProfitColor = (profit) => {
        return profit.startsWith("+") ? "text-green-400" : "text-red-400";
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return (
        <div className="space-y-4">
            {completedRejectedJobs.length > 0 ? (
                completedRejectedJobs.map((request) => (
                    <div key={request.id} className="bg-white/10 p-3 rounded-lg shadow-sm border border-white/20">
                        {console.log(request)}
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm text-white max-w-[70%] truncate" title={request.title}>
                                {truncateText(request.title, 20)}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(request.status)}`}>
                                {request.status}
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
                            <p className="text-xs text-white/80 max-w-[70%] truncate" title={request.client}>
                                {truncateText(request.client, 15)}
                            </p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-white/80">{request.status === "Completed" ? `Completed On: ${request.date}` : `Rejected On: ${request.date}`}</span>
                            <span className={`text-sm font-semibold ${getProfitColor(request.profit)}`}>
                                {request.status === "Completed" ? `${request.profit}` : request.profit}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-white/80">No rejected/completed requests</p>
            )}
        </div>
    );
};

export default CompletedRequests; 