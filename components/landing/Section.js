import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function Section({reverse=false, lottie="https://lottie.host/f6ca150a-57b0-4958-9b01-c67f78570beb/9ns3BTbHE2.lottie"}) {
    return (
            <section className={`flex w-screen ${reverse ? 'flex-row-reverse' : 'flex-row'} h-screen p-15`}>
                <div className="w-1/2 space-y-3">
                    {reverse ? <h2 className="text-lg font-bold max-w-2xl">Empowering Freelancers & Clients With Decentralized Connections</h2> 
                    :
                     <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold max-w-2xl">Empowering Freelancers & Clients With Decentralized Connections</h1>
                    }
                    
                    <p className="text-2xl max-w-2xl">Seamless, secure, and decentralized—connect, collaborate, and get paid without middlemen.</p>
                    <div className="flex w-96 h-11 gap-2">
                        <button className="bg-ut-orange custom-button">FIND JOBS</button>
                        <button className="border custom-button">FIND TALENT</button>
                    </div>
                </div>
                <div className="w-8/12">
                    <DotLottieReact
                    className="object-cover"
                    src={lottie}
                    loop
                    autoplay
                    />
                </div>
            </section>
    )
}