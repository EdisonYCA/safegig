import Navbar from "@/components/landing/Navbar"
import Image from "next/image"

const navigation = [
    { name: 'Home', icon: '/48-home.svg', href: '/dashboard', current: true },
    { name: 'Profile', icon: '/48-home.svg', href: '#', current: false },
    { name: 'Messages', icon: '/48-home.svg', href: '#', current: false },
    { name: 'Settings', icon: '/48-home.svg', href: '#', current: false },
]

const actionBtns = [
    { name: 'FREELANCE JOBS', icon: null, href: '#', css: "w-1/4 bg-sky-blue text-prussian-blue"},
    { name: 'FULL-TIME JOBS', icon: null, href: '#', css: "w-1/4 bg-blue-green text-white "},
    { name: 'CATALOGS', icon: null, href: '#', css: "w-1/4 bg-prussian-blue text-white"},
    { name: 'POST GIG', icon: null, href: '#', css: "w-1/8 bg-selective-yellow text-prussian-blue"},
    { name: '', icon: null, href: '#', css: "w-1/8 bg-ut-orange"},
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    return (
        <>
        <Navbar />

        <div className="h-screen w-screen flex">
            <div className="h-screen flex flex-col p-5 gap-4 bg-gray-300">
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
            <div className="bg-white w-full h-full flex flex-col">
                <div className="w-full h-20 p-2 gap-5 flex">
                    {actionBtns.map((btn) => (
                        <a key={btn.name} 
                        href={btn.href}
                        className={"h-full rounded-md flex items-center justify-center " + btn.css}
                        >
                            {btn.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}
