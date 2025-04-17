import Image from "next/image";

export default function SideNav(){
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const navigation = [
        { name: 'Home', icon: '/home-3.svg', href: '/dashboard', current: true },
        { name: 'Wallet', icon: '/wallet-2.svg', href: '#', current: false },
        { name: 'Activity', icon: '/c-question-3.svg', href: '#', current: false },
        { name: 'My Gigs', icon: '/lock-3.svg', href: '#', current: false },
    ]

    return (
        <>
            {/* sidebar navigation */}
            <div className="row-span-full col-span-2 p-5 gap-4 bg-gray-100 rounded-lg">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current 
                                    ? 'bg-gray-200 border-gray-400 border' 
                                    : 'hover:scale-105',
                                'group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-prussian-blue'
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
        </>
    );
}