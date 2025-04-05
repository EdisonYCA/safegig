import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function Section() {
    return (
            <section className="flex w-full h-3/6 p-15">
                <div className="w-1/2 space-y-3">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold max-w-2xl">Empowering Freelancers & Clients With Decentralized Connections</h1>
                    <p className="text-2xl max-w-2xl">Seamless, secure, and decentralized—connect, collaborate, and get paid without middlemen.</p>
                    <div className="flex w-96 h-11 gap-2">
                        <button className="bg-ut-orange custom-button">FIND JOBS</button>
                        <button className="border custom-button">FIND TALENT</button>
                    </div>
                </div>
                <div className="w-1/2">
                    <DotLottieReact
                    className="object-cover"
                    src="https://lottie.host/f6ca150a-57b0-4958-9b01-c67f78570beb/9ns3BTbHE2.lottie"
                    loop
                    autoplay
                    />
                </div>
            </section>
    )
}