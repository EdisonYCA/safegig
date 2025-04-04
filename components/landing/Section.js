import Image from "next/image";

export default function Section() {
    return (
            <section className="flex w-full h-3/6">
                <div className="w-1/2 space-y-3">
                    <h1 className="text-6xl font-bold max-w-2xl">Empowering Freelancers & Clients With Decentralized Connections</h1>
                    <p className="text-2xl max-w-2xl">Seamless, secure, and decentralized—connect, collaborate, and get paid without middlemen.</p>
                    <div className="flex w-96 h-11 gap-2">
                        <button className="bg-ut-orange w-full rounded-3xl">FIND JOBS</button>
                        <button className="border w-full rounded-3xl">FIND TALENT</button>
                    </div>
                </div>
                <div className="bg-blue-500 w-1/2">
                    <Image src="/images/hero.png" alt="hero" width={100} height={100} />
                </div>
            </section>
    )
}