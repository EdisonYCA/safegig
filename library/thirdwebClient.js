import { createThirdwebClient } from "thirdweb";
import { createWallet, privateKeyToAccount } from "thirdweb/wallets";
import { createAuth } from "thirdweb/auth";
import { deployContract } from "thirdweb/deploys";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: clientId
});

export const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

