import Image from "next/image";
import Gig from "./Gig";
import { useState } from "react";
import GigDetailModal from "./GigDetailModal";

const GigDB = [
    {
      profile_pic: "/circle-user-filled.svg",
      name: "Alex Ryan",
      title: "Professional Logo Design",
      description: "I'll design a unique and professional logo tailored to your brand, with 3 initial concepts and unlimited revisions.",
      price: 75,
      stars: 5,
      id: 0,
    },
    {
      profile_pic: "/circle-user-filled.svg",
      name: "Sarah Thompson",
      title: "Social Media Content Creation",
      description: "I create engaging TikTok and Instagram reels that boost engagement and align with your brand identity.",
      price: 60,
      stars: 4,
      id: 1,
    },
    {
      profile_pic: "/circle-user-filled.svg",
      name: "Daniel Perez",
      title: "Podcast Audio Editing",
      description: "Offering full podcast editing services including noise reduction, intro/outro insertion, and sound leveling.",
      price: 100,
      stars: 5,
      id: 2,
    },
    {
      profile_pic: "/circle-user-filled.svg",
      name: "Jessica Lee",
      title: "Figma Mobile App UI/UX Design",
      description: "I’ll design your iOS or Android app in Figma with modern UI/UX practices and a clickable prototype.",
      price: 150,
      stars: 5,
      id: 3,
    },
    {
      profile_pic: "/circle-user-filled.svg",
      name: "Stephen Leshko",
      title: "React + Web3 Developer Coaching",
      description: "I’ll mentor you 1-on-1 in React.js, Next.js, and building blockchain dApps using Solidity and smart contracts.",
      price: 200,
      stars: 5,
      id: 4,
    },
    {
      profile_pic: "/circle-user-filled.svg",
      name: "Lily Adams",
      title: "Custom Resume + LinkedIn Revamp",
      description: "Offering personalized resume writing and LinkedIn optimization to help you land interviews.",
      price: 90,
      stars: 4,
      id: 5,
    },
    {
      profile_pic: "/circle-user-filled.svg",
      name: "Raj Patel",
      title: "Full-Stack Web Development",
      description: "I’ll build a responsive and dynamic web application using MERN stack or Next.js — includes deployment.",
      price: 500,
      stars: 5,
      id: 6,
    },
  ];
  

export default function Gigs(){
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredGigs = GigDB.filter((job) => (
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    ))

    return (
        <div className="row-start-2 col-start-3 row-span-full col-span-full bg-gray-100 rounded-lg p-3 shadow-md gap-3 flex flex-col">
            <div className="col-span-full flex justify-center">
                <div className="w-full flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
                    <Image
                        src="/zoom-3.svg"
                        alt="search icon"
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    <input
                    onChange={(s) => (setSearchQuery(s.target.value))}
                    type="text"
                    placeholder="Search gigs..."
                    className="w-full outline-none text-sm text-prussian-blue placeholder-prussian-blue"
                    />
                </div>
            </div>
            <div className="w-full h-full flex flex-col overflow-y-auto gap-3">
                {
                    filteredGigs.map((gig) => (
                    <Gig
                        key={gig.id}
                        profile={gig.profile_pic}
                        name={gig.name}
                        title={gig.title}
                        description={gig.description}
                        price={gig.price}
                        stars={gig.stars}
                        onSeeMore={() => setSelectedJob(gig)}
                    />
                    ))
                }
            </div>   
            {
                selectedJob && <GigDetailModal gig={selectedJob} onClose={() => (setSelectedJob(null))}/>
            }
        </div>
    );
}