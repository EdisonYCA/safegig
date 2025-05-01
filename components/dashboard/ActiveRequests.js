import React from 'react';

const ActiveRequests = () => {
    // Dummy data for active requests
    const activeRequests = [
        // {
        //     id: "0x1234...5678", // job id from the database
        //     title: "Website Development",
        //     client: "0x1234...5678", // client wallet address
        //     timeline: "2024-03-25", // proposed timeline end date
        //     amount: "$500" // proposed price
        // },
        // {
        //     id: "0x2345...6789",
        //     title: "Mobile App Design",
        //     client: "0x2345...6789",
        //     timeline: "2025-05-20",
        //     amount: "$750"
        // },
        // {
        //     id: "0x3456...7890",
        //     title: "Content Writing",
        //     client: "0x3456...7890",
        //     timeline: "2025-05-03",
        //     amount: "$300"
        // }
    ];

    const getRemainingDays = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
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
                    const remainingDays = getRemainingDays(request.timeline);
                    const statusColor = getStatusColor(remainingDays);
                    
                    return (
                        <div key={request.id} className="bg-white/10 p-3 rounded-lg shadow-sm border border-white/20">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm text-white">{request.title}</h4>
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
                                <p className="text-xs text-white/80">{request.client}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-white/80">Due: {request.timeline}</span>
                                <span className="text-sm font-semibold text-ut-orange">{request.amount}</span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ActiveRequests; 