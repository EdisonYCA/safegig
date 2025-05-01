import Image from "next/image";
import { useState } from "react";
import { getWorkRequests } from "@/library/db/work";
import { useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/router";

export default function Home() {
  const [activeButton, setActiveButton] = useState(0);
  const [workRequests, setWorkRequests] = useState([]);
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (account === undefined) {return;}

    if (!account) {
      router.push('/');
      return;
    }

    const fetchWorkRequests = async () => {
      try {
        const workRequests = await getWorkRequests(account.address);
        setWorkRequests(workRequests);
        console.log("Work Requests:", workRequests);
      } catch (error) {
        console.error('Error fetching work requests:', error);
        setWorkRequests([]);
      }
    };
    
    fetchWorkRequests();
  }, [account]);

  const jobRequests = [
    {
      title: "Logo Design",
      originalPrice: "500",
      proposedPrice: "750",
      worker: "0xDEADBEEF1234567890",
      originalTimeline: "2 Days",
      proposedTimeline: "3 Days"
    }
  ];

  const gigBtns = [
    { name: "Work Requests", id: 0 },
    { name: "Job Requests", id: 1 },
  ];

  const getActiveData = () => {
    return activeButton === 0 ? workRequests : jobRequests;
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
        <div className="w-full h-1/2 flex flex-wrap">
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
                      src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${w.proposerWallet}`}
                      alt="profile"
                      className="size-8 rounded-full"
                    />
                    <div className="mb-3">
                      <h2 className="text-sm font-semibold text-gray-300">
                        {w.proposerWallet.slice(0, -15)}...
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
                <div className="flex gap-2">
                  <button className="flex-1 rounded-lg py-2 text-sm font-semibold bg-green-500 hover:scale-105 transition">
                    Accept
                  </button>
                  <button className="flex-1 rounded-lg py-2 text-sm font-semibold bg-red-500 hover:scale-105 transition">
                    Decline
                  </button>
                  <button className="flex-1 rounded-lg py-2 text-sm font-semibold bg-ut-orange hover:scale-105 transition">
                    View Work
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
