import Navbar from "@/components/landing/Navbar"
import Image from "next/image"

const navigation = [
    { name: 'Home', icon: '/48-home.svg', href: '/dashboard', current: true },
    { name: 'Profile', icon: '/48-home.svg', href: '#', current: false },
    { name: 'Messages', icon: '/48-home.svg', href: '#', current: false },
    { name: 'Settings', icon: '/48-home.svg', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    return (
        <>
        <Navbar />

        <div className="h-screen w-screen flex">
            <div className="h-screen flex flex-col p-5 gap-4">
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
        </div>
        </>
    )
}
