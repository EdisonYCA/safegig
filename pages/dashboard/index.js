import Navbar from "@/components/landing/Navbar"
import Home from "@/components/dashboard/Home"
import SideNav from "@/components/dashboard/SideNav"
import ActionButtons from "@/components/dashboard/ActionButtons"
import Jobs from "@/components/work/Jobs"
import Gigs from "@/components/work/Gigs"
import { useStateContext } from "@/context/StateContext"


export default function Dashboard() {
    const {content} = useStateContext();

    const renderContent = () => {
        if (content == "Home") {
            return <Home/>
        } else if (content == "Find Work") {
            return <Jobs/>
        } else if (content == "Find Jobs") {
            return <Gigs/>
        }
    }

    return (
        <>
        <Navbar page="dashboard"/>
        <div className="h-screen w-screen grid grid-cols-10 grid-rows-16 gap-2 p-2 shadow-md">
            <ActionButtons/>
            {renderContent()}
        </div>
        </>
    )
}
