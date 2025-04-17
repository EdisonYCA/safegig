import { useStateContext } from "@/context/StateContext";
import Image from "next/image"

export default function ActionButtons(){
    const actionBtns = [
        { name: 'FREELANCE JOBS',icon: null, href: '#', colors: "bg-sky-blue text-prussian-blue", css: "col-span-2" },
        { name: 'FULL-TIME JOBS', icon: null, href: '#', colors: "bg-blue-green text-white", css: "col-span-2" },
        { name: 'CATALOGS', icon: null, href: '#', colors: "bg-prussian-blue text-white", css: "col-span-2" },
        { name: 'POST GIG', icon: "/48-s-add.svg", href: '#', colors: "bg-selective-yellow text-prussian-blue", css: "col-span-2" },
    ]
    
    const {setContent} = useStateContext();

    return (
        <>
        {/* action buttons */}
        {actionBtns.map((btn) => (
                <div key={btn.name} className={`row-span-1 flex justify-center ${btn.css}`}>
                    <button
                        onClick={() => (setContent(btn.name))}
                        href={btn.href}
                        className={
                            `rounded-lg flex justify-center items-center w-full h-full shadow-md hover:scale-101 hover:shadow-lg transition-shadow duration-200 ${btn.colors}`
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
                    </button>
                </div>
            ))}
        </>
    );
}