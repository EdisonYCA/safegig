import Navbar from "@/components/landing/Navbar"
import Home from "@/components/dashboard/Home"
import SideNav from "@/components/dashboard/SideNav"
import ActionButtons from "@/components/dashboard/ActionButtons"
import Jobs from "@/components/work/Jobs"
import Gigs from "@/components/work/Gigs"
import { useStateContext } from "@/context/StateContext"
import { useRouter } from "next/router";
import { useEffect } from "react"
import { useActiveAccount } from "thirdweb/react"
import PostWork from "@/components/work/PostWork"
import ActiveRequests from "@/components/dashboard/ActiveRequests"
import CompletedRequests from "@/components/dashboard/CompletedRequests"


export default function Dashboard() {
    const {content} = useStateContext();
    const account = useActiveAccount();
    const router = useRouter();

    const renderContent = () => {
        if (content === "Home") {
            return <Home/>
        } else if (content === "Find Work") {
            return <Jobs/>
        } else if (content === "Find Jobs") {
            return <Gigs/>
        } else if (content === "Post Work") {
            return <PostWork/>
        }
    }

    // useEffect(() => {
    //     if (!account) {router.push("/")}
    // }, [account])

    return (
        <>
        <Navbar page="dashboard"/>
        <div className="h-screen w-screen grid grid-cols-10 grid-rows-16 gap-2 p-2 shadow-md">
            <ActionButtons/>
            {renderContent()}
            <div className="col-start-9 col-span-2 row-start-3 row-span-14 grid grid-rows-2 gap-2">
                <div className="bg-prussian-blue rounded-lg shadow-md p-4 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 text-white">Active</h3>
                    <div className="overflow-y-auto flex-1">
                        <ActiveRequests />
                    </div>
                </div>
                <div className="bg-ut-orange rounded-lg shadow-md p-4 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 text-white">Completed/Rejected</h3>
                    <div className="overflow-y-auto flex-1">
                        <CompletedRequests />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
