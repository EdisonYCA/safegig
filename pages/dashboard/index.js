import Navbar from "@/components/landing/Navbar"
import Home from "@/components/dashboard/Home"
import SideNav from "@/components/dashboard/SideNav"
import ActionButtons from "@/components/dashboard/ActionButtons"
import { useStateContext } from "@/context/StateContext"

export default function Dashboard() {
    const {content} = useStateContext();

    const renderContent = () => {
        if (content == "Home") {
            return <Home/>
        }
    }

    return (
        <>
        <Navbar page="dashboard"/>
        <div className="h-screen w-screen grid grid-cols-10 grid-rows-10 bg-white gap-2 p-2 shadow-md">
            <SideNav/>
            <ActionButtons/>
            {renderContent()}
        </div>
        </>
    )
}
