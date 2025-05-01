import Image from "next/image";
import { useState, useEffect } from "react";
import { getWorkRequests, getJobRequests, updateProposalStatus } from "@/library/db/work";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/router";

export default function Home() {
  const [activeButton, setActiveButton] = useState(0);
  const [workRequests, setWorkRequests] = useState([]);
  const [jobRequests, setJobRequests] = useState([]);
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (account === undefined) {return;}

    if (!account) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const workRequests = await getWorkRequests(account.address);
        const jobRequests = await getJobRequests(account.address);
        setWorkRequests(workRequests);
        setJobRequests(jobRequests);
      } catch (error) {
        console.error('Error fetching data:', error);
        setWorkRequests([]);
        setJobRequests([]);
      }
    };
    
    fetchData();
  }, [account]);

  const gigBtns = [
    { name: "Work Requests", id: 0 },
    { name: "Job Requests", id: 1 },
  ];

  const getActiveData = () => {
    return activeButton === 0 ? workRequests : jobRequests;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const handleDecline = async (jobId, proposerWallet) => {
    try {
      console.log(jobId, proposerWallet);
      await updateProposalStatus(jobId, proposerWallet, "rejected");
      const updatedWorkRequests = await getWorkRequests(account.address);
      const jobRequests = await getJobRequests(account.address);
      setWorkRequests(updatedWorkRequests);
      setJobRequests(jobRequests);
    } catch (error) {
      console.error('Error declining proposal:', error);
    }
  };

  return (
    <>
      <div className="col-span-8 row-start-3 bg-gray-200 row-span-full bg-gray-100 rounded-lg flex flex-col p-2 gap-3 shadow-md">
        {/* Toggle Buttons */}
        <div className="flex w-full h-[13%] rounded-lg gap-1">
          {gigBtns.map((btn) => (
            <button
              onClick={() => setActiveButton(btn.id)}
              key={btn.name}
              className={`h-full w-1/2 text-lg rounded-lg transition-all duration-200 ease-in-out ${
                activeButton === btn.id
                  ? "bg-ut-orange text-white shadow-sm"
                  : "text-prussian-blue hover:white hover:shadow-md"
              }`}
            >
              {btn.name}
            </button>
          ))}
        </div>
        {/* Work Request & Job Request */}
        <div className="w-full h-1/2 flex flex-wrap gap-3">
          {getActiveData().length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500 text-lg">
                {activeButton === 0 ? "You have no work requests" : "You have no job requests"}
              </p>
            </div>
          ) : (
            getActiveData().map((w, i) => (
              <div
                key={i}
                className="w-1/3 bg-prussian-blue rounded-2xl shadow-lg p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-xl font-bold text-white">{w.title}</h1>
                  <div className="flex gap-2 mb-3">
                    <img
                      src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${activeButton === 0 ? w.proposerWallet : w.client}`}
                      alt="profile"
                      className="size-8 rounded-full"
                    />
                    <div className="mb-3">
                      <h2 className="text-sm font-semibold text-gray-300">
                        {activeButton === 0 ? w.proposerWallet.slice(0, -15) : w.client.slice(0, -15)}...
                      </h2>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Image
                            key={i}
                            src="/star-2.svg"
                            alt="star"
                            width={10}
                            height={10}
                            className="mr-1"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <p className="text-white text-sm">Original Price:</p>
                      <p className="text-white line-through text-sm">
                        ${w.originalPrice}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white text-sm">Proposed Price:</p>
                      <p className="text-ut-orange font-semibold text-sm">
                        ${w.proposedPrice}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white text-sm">Original Timeline:</p>
                      <p className="text-white line-through text-sm">
                        {w.originalTimeline}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-white text-sm">Proposed Timeline:</p>
                      <p className="text-ut-orange font-semibold text-sm">
                        {w.proposedTimeline}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <p className="text-white text-sm font-semibold mb-1">Message:</p>
                      <p className="text-gray-300 text-sm italic">
                        "{w.message}"
                      </p>
                    </div>
                  </div>
                </div>
                {activeButton === 0 ? (
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg py-2 text-sm font-semibold bg-green-500 hover:scale-105 transition">
                      Accept
                    </button>
                    <button className="flex-1 rounded-lg py-2 text-sm font-semibold bg-red-500 hover:scale-105 transition"
                      onClick={() => handleDecline(w.id, w.proposerWallet)}>
                      Decline
                    </button>
                    <button className="flex-1 rounded-lg py-2 text-sm font-semibold bg-ut-orange hover:scale-105 transition">
                      View Work
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <span className={`px-4 py-2 rounded-lg text-white font-semibold ${getStatusColor(w.status)}`}>
                      {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
