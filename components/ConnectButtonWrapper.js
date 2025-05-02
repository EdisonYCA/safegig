import { ConnectButton } from 'thirdweb/react'
import { client } from '@/library/thirdwebClient'
import { wallets } from '@/library/thirdwebClient'
import { darkTheme } from "thirdweb/react";
import { defineChain } from "thirdweb";

export const ConnectButtonWrapper = () => {
        return (
        <ConnectButton
            client={client}
            accountAbstraction={{
                chain: defineChain(97),
                sponsorGas: true,
            }}
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
    );
}