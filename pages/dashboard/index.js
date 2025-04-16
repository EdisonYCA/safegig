import Navbar from "@/components/landing/Navbar"
import Image from "next/image"

const navigation = [
    { name: 'Home', icon: '/48-home.svg', href: '/dashboard', current: true },
    { name: 'Profile', icon: '/48-home.svg', href: '#', current: false },
    { name: 'Messages', icon: '/48-home.svg', href: '#', current: false },
    { name: 'Settings', icon: '/48-home.svg', href: '#', current: false },
]

const actionBtns = [
    { name: 'FREELANCE JOBS', icon: null, href: '#', colors: "bg-sky-blue text-prussian-blue", css: "col-span-2" },
    { name: 'FULL-TIME JOBS', icon: null, href: '#', colors: "bg-blue-green text-white", css: "col-span-2" },
    { name: 'CATALOGS', icon: null, href: '#', colors: "bg-prussian-blue text-white", css: "col-span-2" },
    { name: 'POST GIG', icon: "/48-s-add.svg", href: '#', colors: "bg-selective-yellow text-prussian-blue", css: "col-span-2" },
]

const gigBtns = [
    { name: 'ACTIVE GIGS', current: true },
    { name: 'COMPLETED GIGS', current: false },
]

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    return (
        <>
        <Navbar page="dashboard"/>

        {/* <div className="h-screen w-screen bg-red-500 flex">
    
            <div className="bg-white w-full h-full flex flex-col">
                <div className="w-full h-full p-2 flex justify-start items-start flex-wrap gap-x-2 gap-y-2">
                    {actionBtns.map((btn) => (
                    <a
                        key={btn.name}
                        href={btn.href}
                        className={
                        "h-16 rounded-lg min-w-[55px] flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200 " +
                        btn.css
                        }
                    >
                    {btn.icon ? (
                    <Image
                        src={btn.icon}
                        alt={btn.name}
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    ) : null}
                    <span>{btn.name}</span>
                </a>
                ))}
                <div className="w-[70.5%] bg-gray-100 flex flex-col rounded-lg p-2 gap-y-4">
                    <div className="w-full h-18 max-h-36 rounded-lg flex bg-gray-200 p-1">
                        {
                            gigBtns.map((btn) => (
                                <button className={classNames(
                                    btn.current 
                                        ? 'bg-prussian-blue text-white' 
                                        : 'bg-gray-200 text-prussian-blue',
                                    'flex rounded-lg items-center justify-center w-1/2 h-full'
                                    )}>
                                    {btn.name}
                                </button>
                            ))
                        }
                    </div>
                    <div className="w-full h-18 rounded-lg flex bg-gray-200 p-1">
                    </div>
                    
                </div>
                <div className="w-[28.5%] bg-gray-100 h-32 flex flex-col rounded-lg p-2">
                </div>
            </div>
        </div> */}
        <div className="h-screen w-screen grid grid-cols-10 grid-rows-10 bg-white gap-2 p-2">
            {/* sidebar navigation */}
            <div className="row-span-full col-span-2 p-5 gap-4 bg-gray-100 rounded-lg">
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                            item.current 
                                ? 'bg-white/10 text-white' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5',
                            'group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200'
                        )}
                    >
                        <Image 
                            src={item.icon} 
                            alt={item.name} 
                            width={24} 
                            height={24}
                            className="transition-transform duration-200 group-hover:scale-110"
                        />
                        <span>{item.name}</span>
                    </a>
                ))}
            </div>
            {/* action buttons */}
            {actionBtns.map((btn) => (
                <div className={`row-span-1 flex justify-center ${btn.css}`}>
                    <a
                        key={btn.name}
                        href={btn.href}
                        className={
                            `rounded-lg flex justify-center items-center w-full h-full shadow-md hover:shadow-lg transition-shadow duration-200 ${btn.colors}`
                        }                       
                        >
                        {btn.icon ? (
                            <Image
                                src={btn.icon}
                                alt={btn.name}
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                        ) : null}
                        <span>{btn.name}</span>
                    </a>
                </div>
            ))}

            {/* gigs */}
            <div className="col-span-6 row-start-2 row-span-full bg-gray-100 rounded-lg flex flex-col p-2 gap-3">
                <div className="flex w-full h-[13%] rounded-lg bg-gray-200 p-1">
                    {
                        gigBtns.map((btn) => (
                            <button className={
                                btn.current ? "text-white bg-prussian-blue h-full w-1/2 rounded-lg" 
                                : "text-prussian-blue h-full w-1/2 "
                            }>
                                {btn.name}
                            </button>
                        ))
                    }
                </div>

                {/* Gig Content */}
                {
                    gigs.slice(0, 4).map((gig) => (
                        <div className="w-full rounded-lg bg-gray-200 shadow-sm p-4 flex flex-col gap-1 border border-gray-200">
                            <h2 className="text-md font-semibold text-prussian-blue">{gig.name}</h2>
                            <p className="text-gray-700">{gig.description}</p>
                            <div className="text-lg font-bold text-orange-600">{gig.price}</div>
                        </div>
                    ))
                }
            </div>
            <div className="col-span-2 row-span-4 bg-gray-100 rounded-lg">

            </div>
            <div className="col-span-2 row-span-5 bg-gray-100 rounded-lg">

            </div>
        </div>
        </>
    )
}
