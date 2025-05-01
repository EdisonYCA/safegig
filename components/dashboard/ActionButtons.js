import { useStateContext } from "@/context/StateContext";
import Image from "next/image"

export default function ActionButtons(){
    const actionBtns = [
        { name: 'Home', icon: "/home-3.svg", href: '#', colors: "bg-white text-black col-span-4" },
        { name: 'Find Work',icon: null, href: '#', colors: "bg-blue-green text-white col-span-4" },
        { name: 'Post Work', icon: null, href: '#', colors: "bg-selective-yellow text-prussian-blue col-span-2"},
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
                            `row-span-2 rounded-lg flex justify-center text-lg items-center shadow-md hover:scale-101 hover:shadow-lg transition-shadow duration-200 ${btn.colors}`
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