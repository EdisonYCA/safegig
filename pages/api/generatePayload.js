import { auth } from "@/library/thirdwebClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { address, chainId } = req.body;

    if (!address || !chainId) {
      return res.status(400).json({ error: "Missing address or chainId" });
    }

    const loginPayload = await auth.generatePayload({
      address,
      chainId,
      domain: "localhost:3000"
    });

    return res.status(200).json(loginPayload);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to generate payload",
      details: err.message,
    });
  }
}