import Image from "next/image";
import WorkPosting from "./WorkPosting";
import { useEffect, useState } from "react";
import JobDetailModal from "./JobDetailModal";
import { getAllWork } from '@/library/db/work'

export default function Jobs(){
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [work, setWork] = useState([]);

    // const filteredJobs = JobDB.filter((job) => (
    //     job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     job.description.toLowerCase().includes(searchQuery.toLowerCase())
    // ))

    useEffect(() => {
        const loadWork = async () => {
            const allWork = await getAllWork();
            setWork(allWork || []);
        };
      
        loadWork();
      }, []);

    return (
        <div className="row-start-3 col-span-8 row-span-full bg-gray-100 rounded-lg p-3 shadow-md gap-3 flex flex-col">
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
                    placeholder="Search jobs..."
                    className="w-full outline-none text-sm text-prussian-blue placeholder-prussian-blue"
                    />
                </div>
            </div>
            <div className="w-full h-full flex overflow-y-auto gap-3">
                {work ?
                    work.map((w) => (
                    <WorkPosting
                        key={w.id}
                        client={w.client}
                        name={w.client}
                        title={w.title}
                        timeline={w.timeline}
                        description={w.description}
                        price={w.price}
                        stars={5}
                        onSeeMore={() => setSelectedJob(w)}
                    />
                    )) : null
                }
            </div>   
            {
                selectedJob && <JobDetailModal job={selectedJob} onClose={() => (setSelectedJob(null))}/>
            }
        </div>
    );
}