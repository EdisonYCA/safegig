import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useStateContext } from '@/context/StateContext';
import { ConnectButtonWrapper } from '../ConnectButtonWrapper';



export default function Section(
    {   feature=false, 
        lottie="https://lottie.host/f6ca150a-57b0-4958-9b01-c67f78570beb/9ns3BTbHE2.lottie",
        title="Empowering Freelancers & Clients With Decentralized Connections",
        description="Seamless, secure, and decentralized—connect, collaborate, and get paid without middlemen.",
        featureTitle="CRYPTO PAYMENTS",
        left=false
    }

) {
    const {loggedIn, setLoggedIn } = useStateContext();

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
                        <ConnectButtonWrapper/>
                    </>
                    }
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