import { useStateContext } from "@/context/StateContext";
import Image from "next/image"

export default function ActionButtons(){
    const actionBtns = [
        { name: 'Find Work',icon: null, href: '#', colors: "bg-white text-black col-span-3" },
        { name: 'Find Jobs', icon: null, href: '#', colors: "bg-blue-green text-white col-span-3"},
        { name: 'Post Work', icon: null, href: '#', colors: "bg-prussian-blue text-white col-span-2"},
        { name: 'Post Job', icon: "/48-s-add.svg", href: '#', colors: "bg-selective-yellow text-prussian-blue col-span-2" },
    ]
    
    const {setContent} = useStateContext();

    return (
        <>
        {/* <div className="col-span-full flex gap-2 rounded-lg row-span-2 p-4"> */}
        {/* action buttons */}
        {actionBtns.map((btn) => (
                    <button
                        onClick={() => (setContent(btn.name))}
                        key={btn.name}
                        className={
                            `rounded-lg flex justify-center text-lg p-9 items-center shadow-md hover:scale-101 hover:shadow-lg transition-shadow duration-200 ${btn.colors}`
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
                // </div>
            ))}
        {/* </div> */}
        </>
    );
}