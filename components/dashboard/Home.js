import Image from "next/image";

export default function Home() {
    const gigs = [
        {
        name: "Web Design",
        description: "I will create a modern and responsive web design tailored to your needs.",
        price: "$1500",
        current: true,
        },
        {
        name: "Logo Creation",
        description: "Get a unique and professional logo to represent your brand.",
        price: "$300",
        current: false,
        },
        {
        name: "SEO Optimization",
        description: "Boost your site's ranking with advanced SEO techniques.",
        price: "$800",
        current: false,
        },
        {
        name: "App UI/UX",
        description: "I’ll design a sleek and user-friendly mobile app interface.",
        price: "$1200",
        current: false,
        },
        {
        name: "Landing Page",
        description: "Custom landing page optimized for conversions and mobile.",
        price: "$950",
        current: false,
        },
        {
        name: "E-commerce Setup",
        description: "Complete online store setup with payment integration.",
        price: "$2000",
        current: false,
        },
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
        {/* gigs */}
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

                {/* Gig Content */}
                <div className="w-full h-[87%] flex p-2 gap-1">
                    {
                        gigs.slice(0,4).map((gig) => (
                            <div className="w-1/4 h-1/2 rounded-lg bg-gray-300 shadow-sm p-4 flex flex-col gap-1">
                                <h2 className="text-md font-semibold text-prussian-blue">{gig.name}</h2>
                                <p className="text-gray-700">{gig.description}</p>
                                <div className="text-lg font-bold text-orange-600">{gig.price}</div>
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