import Navbar from "@/components/landing/Navbar"
import Image from "next/image"

const navigation = [
    { name: 'Home', icon: '/48-home.svg', href: '/dashboard', current: true },
    { name: 'Profile', icon: '/48-home.svg', href: '#', current: false },
    { name: 'Messages', icon: '/48-home.svg', href: '#', current: false },
    { name: 'Settings', icon: '/48-home.svg', href: '#', current: false },
]

const actionBtns = [
    { name: 'FREELANCE JOBS', icon: null, href: '#', css: " bg-sky-blue text-prussian-blue"},
    { name: 'FULL-TIME JOBS', icon: null, href: '#', css: " bg-blue-green text-white "},
    { name: 'CATALOGS', icon: null, href: '#', css: " bg-prussian-blue text-white"},
    { name: 'POST GIG', icon: "/48-s-add.svg", href: '#', css: " bg-selective-yellow text-prussian-blue"},
    { name: '', icon: null, href: '#', css: " bg-ut-orange"},
]

const gigBtns = [
    { name: 'ACTIVE GIGS', current: true },
    { name: 'COMPLETED GIGS', current: false },
]

const activeGigs = [
    {
        id: 1,
        title: 'Website Development for Local Restaurant',
        client: 'Gourmet Bites',
        status: 'In Progress',
        budget: '$2,500',
        deadline: '2024-04-15',
        progress: 65,
        description: 'Create a responsive website with online ordering system for a local restaurant.',
        category: 'Web Development',
        skills: ['React', 'Node.js', 'MongoDB']
    },
    {
        id: 2,
        title: 'Logo Design for Tech Startup',
        client: 'TechVentures Inc',
        status: 'Review',
        budget: '$800',
        deadline: '2024-03-25',
        progress: 90,
        description: 'Design a modern and minimalist logo for a new AI startup.',
        category: 'Graphic Design',
        skills: ['Adobe Illustrator', 'Branding']
    },
    {
        id: 3,
        title: 'Social Media Marketing Campaign',
        client: 'EcoFriendly Products',
        status: 'In Progress',
        budget: '$1,200',
        deadline: '2024-04-10',
        progress: 40,
        description: '3-month social media marketing campaign focusing on Instagram and LinkedIn.',
        category: 'Digital Marketing',
        skills: ['Social Media', 'Content Creation', 'Analytics']
    },
    {
        id: 4,
        title: 'Mobile App UI/UX Design',
        client: 'FitnessFirst',
        status: 'In Progress',
        budget: '$3,000',
        deadline: '2024-04-20',
        progress: 30,
        description: 'Design user interface and experience for a fitness tracking mobile application.',
        category: 'UI/UX Design',
        skills: ['Figma', 'User Research', 'Prototyping']
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    return (
        <>
        <Navbar />

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
        <div className="h-screen w-screen grid grid-cols-6 grid-rows-6 bg-white gap-2 p-2">
            <div className="row-span-6 p-5 gap-4 bg-gray-100 rounded-lg">
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

                {actionBtns.map((btn) => (
                    <div className="col-span-1 row-span-1 flex justify-center">
                        <a
                            key={btn.name}
                            href={btn.href}
                            className={
                                "rounded-lg flex justify-center items-center w-full h-[55%] shadow-md hover:shadow-lg transition-shadow duration-200 " +
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
                    </div>
                ))}
        </div>
        </>
    )
}
