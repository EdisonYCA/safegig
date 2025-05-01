import Image from "next/image";

export default function Home() {
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

    const setActiveButton = (btn) => {
        if (btn === 0) {
            gigBtns[0].active = false
            gigBtns[1].active = true
        } else {
            gigBtns[0].active = true
            gigBtns[1].active = false
        }
    }

    const fetchWorkReq = () => {
        setActiveButton(0)

        // interact with user smart contract to fetch all of this users work requests
    }

    const fetchJobReq = () => {
        setActiveButton(1)

        // interact with user smart contract to fetch all of this users work requests
    }

    let gigBtns = [
        { name: 'Work Requests', current: true, fc: {fetchWorkReq}},
        { name: 'Job Requests', current: false, fc: {fetchJobReq}}
    ]

    return (
        <>
        {/* Request Buttons */}
        <div className="col-span-8 row-start-3 bg-gray-200 row-span-full bg-gray-100 rounded-lg flex flex-col p-2 gap-3 shadow-md">
                <div className="flex w-full h-[13%] rounded-lg gap-1">
                    {
                        gigBtns.map((btn) => (
                            <button
                              onClick={() => {btn.fc}}
                              key={btn.name}
                              className={`h-full w-1/2 text-lg rounded-lg transition-all duration-200 ease-in-out
                                ${btn.current
                                  ? "bg-ut-orange text-white shadow-sm"
                                  : "text-prussian-blue hover:white hover:shadow-md"}`}
                            >
                              {btn.name}
                            </button>
                          ))
                    }
                </div>

                {/* Work Request Content */}
                <div className="w-full h-1/2 flex flex-wrap">
                {
                    workRequests.slice(0, 4).map((w, i) => (
                        <div key={i} className="w-1/3 bg-prussian-blue rounded-2xl shadow-lg p-5 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-xl font-bold text-white">{w.title}</h1>
                            <p className="text-white text-sm">
                                <span className="font-semibold text-gray-300">Proposed by:</span> {w.worker.slice(0, -7)}
                            </p>
                            <div className="mt-2 space-y-1">
                            <div className="flex justify-between items-center">
                                <p className="text-white text-sm">Original Price:</p>
                                <p className="text-white line-through text-sm">${w.originalPrice}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-white text-sm">Proposed Price:</p>
                                <p className="text-ut-orange font-semibold text-sm">${w.proposedPrice}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-white text-sm">Original Timeline:</p>
                                <p className="text-white line-through text-sm">{w.originalTimeline}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-white text-sm">Proposed Timeline:</p>
                                <p className="text-ut-orange font-semibold text-sm">{w.proposedTimeline}</p>
                            </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                            className="flex-1 rounded-lg py-2 text-sm font-semibold bg-green-500 hover:scale-105 transition"
                            onClick={() => {/* Accept logic */}}
                            >
                            Accept
                            </button>
                            <button
                            className="flex-1 rounded-lg py-2 text-sm font-semibold bg-red-500 hover:scale-105 transition"
                            onClick={() => {/* Decline logic */}}
                            >
                            Decline
                            </button>
                            <button
                            className="flex-1 rounded-lg py-2 text-sm font-semibold bg-ut-orange hover:scale-105 transition"
                            onClick={() => {/* Navigate to original gig */}}
                            >
                            View Work
                            </button>
                        </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            {/* Wallet content */}
            <div className="col-span-2 row-span-7 bg-gray-100 rounded-lg flex flex-col p-2 gap-2 shadow-md">
                <div className="w-full h-[15%]">
                    <h2 className="text-md font-semibold text-prussian-blue">WALLET</h2>
                </div>
                <div className="w-full h-1/4 gap-2">
                    <p className="text-prussian-blue">Estimated Balance: $0.00</p>
                    <p className="text-prussian-blue">Safe Balance: $0.00</p>
                </div>
                <div className="w-full h-1/4 bg-gray-200 rounded-lg flex p-3">
                    <div className="w-[85%] h-full">
                    <span className="flex items-center gap-2 text-prussian-blue">
                        <Image
                            src="/cloud.svg"
                            alt="cloud"
                            width={20}
                            height={20}
                        />
                        <p className="text-sm font-medium">Cloud Wallet</p>
                    </span>
                        <p className="text-prussian-blue">0xEDf309C67875</p>
                    </div>
                </div>
                <button className="w-full rounded-lg h-1/4 bg-ut-orange flex items-center p-2 gap-3 hover:opacity-90 transition-all">
                    <Image
                        src="/MetaMask_Fox.svg"
                        alt="Meta Mask Fox"
                        width={45}
                        height={45}
                        className="bg-black rounded-lg"
                    />
                    <div className="w-full h-full text-left">
                        <p className="text-prussian-blue font-semibold">Connect Metamask</p>
                        <p className="text-prussian-blue text-sm">Sync Your Accounts</p>
                    </div>
                </button>
            </div>
            <div className="col-span-2 row-span-7 bg-gray-100 rounded-lg shadow-md">
            </div>
        </>
    )
}