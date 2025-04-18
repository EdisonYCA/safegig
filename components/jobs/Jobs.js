import Image from "next/image";
import Job from "./Job";
import { useState } from "react";
import JobDetailModal from "./JobDetailModal";

const JobDB = [
    {
        profile_pic: "/circle-user-filled.svg",
        name: "Alex Ryan",
        title: "Logo Editor's Needed",
        description: "We are seeking experienced Logo Editors to join our creative team. As a Logo Editor, you will have the opportunity to join this is a really really long descrition of a job. I need you to create an even better layout for the opportunity to. If you fail to, then you must and I mean MUST suggest a better account.",
        price: 5000,
        stars: 3,
        id: 0
    },
    {
        profile_pic: "/circle-user-filled.svg",
        name: "Sarah Thompson",
        title: "Social Media Content Creator",
        description: "Need a content creator to produce short-form videos and graphics for TikTok and Instagram.",
        price: 1800,
        stars: 4,
        id: 1
    },
    {
        profile_pic: "/circle-user-filled.svg",
        name: "Daniel Perez",
        title: "Podcast Editor (Ongoing)",
        description: "Looking for a long-term podcast editor to clean audio, add intro/outro music, and optimize for Spotify.",
        price: 3000,
        stars: 5,
        id: 2
    },
    {
        profile_pic: "/circle-user-filled.svg",
        name: "Jessica Lee",
        title: "Figma UX Designer",
        description: "We're redesigning our mobile app and need a Figma-savvy UX designer with mobile experience.",
        price: 4000,
        stars: 5,
        id: 3
    }
];

export default function Jobs(){
    const [selectedJob, setSelectedJob] = useState(null);

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
                    type="text"
                    placeholder="Search gigs..."
                    className="w-full outline-none text-sm text-prussian-blue placeholder-prussian-blue"
                    />
                </div>
            </div>
            <div className="w-full h-full flex flex-col overflow-y-auto gap-3">
                {JobDB.map((job) => (
                        <Job
                            key={job.id}
                            profile={job.profile_pic}
                            name={job.name}
                            title={job.title}
                            description={job.description}
                            price={job.price}
                            stars={job.stars}
                            onSeeMore={() => setSelectedJob(job)}
                        />
                    ))}
            </div>   
            {
                selectedJob && <JobDetailModal job={selectedJob} onClose={() => (setSelectedJob(null))}/>
            }
        </div>
    );
}