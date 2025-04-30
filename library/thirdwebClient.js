import { createThirdwebClient } from "thirdweb";
import { createWallet, privateKeyToAccount } from "thirdweb/wallets";
import { createAuth } from "thirdweb/auth";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const privateKey = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY;

export const client = createThirdwebClient({
  clientId: clientId,
});

export const auth = createAuth({
  domain: "localhost:3000",
  client,
  adminAccount: privateKeyToAccount({client, privateKey})
})

export const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];