import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeButton, setActiveButton] = useState(0);

  const workRequests = [
    {
      title: "Web Design",
      originalPrice: "1500",
      proposedPrice: "3000",
      worker: "0x98738E43a9F6BD44f8c9ED2a635ff08A0cB91087",
      originalTimeline: "5 Days",
      proposedTimeline: "10 Days"
    }
  ];

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
          {getActiveData().map((w, i) => (
            <div
              key={i}
              className="w-1/3 bg-prussian-blue rounded-2xl shadow-lg p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-white">{w.title}</h1>
                <div className="flex gap-2 mb-3">
                  <img
                    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${w.worker}`}
                    alt="profile"
                    className="size-8 rounded-full"
                  />
                  <div className="mb-3">
                    <h2 className="text-sm font-semibold text-gray-300">
                      {w.worker.slice(0, -15)}...
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
          ))}
        </div>
      </div>
    </>
  );
}
