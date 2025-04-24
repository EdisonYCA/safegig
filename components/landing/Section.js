import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ConnectButton } from 'thirdweb/react'
import { client } from '@/library/thirdwebClient'
import { wallets } from '@/library/thirdwebClient'
import { darkTheme } from "thirdweb/react";


export default function Section(
    {   feature=false, 
        lottie="https://lottie.host/f6ca150a-57b0-4958-9b01-c67f78570beb/9ns3BTbHE2.lottie",
        title="Empowering Freelancers & Clients With Decentralized Connections",
        description="Seamless, secure, and decentralized—connect, collaborate, and get paid without middlemen.",
        featureTitle="CRYPTO PAYMENTS",
        left=false
    }

) {
    return (
            <section className={`flex w-screen ${left ? 'flex-row-reverse' : 'flex-row'} h-screen p-15`}>
                <div className="w-1/2 space-y-3">
                    {feature ? 
                    <>
                        <h3 className="text-2xl font-bold">{featureTitle}</h3> 
                        <h2 className="text-4xl font-bold max-w-2xl">{title}</h2> 
                        <p className="text-xl max-w-2xl">{description}</p>
                    </>
                    : 
                    <>
                        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold max-w-2xl">{title}</h1>
                        <p className="text-2xl max-w-2xl">{description}</p>
                    </>
                    }
                    <div className={`flex h-11 ${feature ? "w-64" : "w-96 gap-2"}`}>
                        {/* <button className={`${feature ? "bg-prussian-blue" : "bg-ut-orange"} custom-button`}>FIND JOBS</button>
                        {feature ? null : <button className="border custom-button">FIND TALENT</button>} */}
                        <ConnectButton
                            client={client}
                            wallets={wallets}
                            theme={darkTheme({
                                colors: {
                                primaryButtonBg: "hsl(32, 100%, 49%)",
                                primaryButtonText: "hsl(0, 0%, 100%)",
                                },
                                fontFamily: 'Outfit'
                            })}
                            connectModal={{ size: "compact", showThirdwebBranding: false }}
                            connectButton={{ label: "Get Started" }}
                        />
                    </div>
                </div>
                <div className='w-8/12'>
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