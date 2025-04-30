import * as cookie from "cookie";
import { auth } from "@/library/thirdwebClient";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { payload } = req.body;

    if (!payload) {
      return res.status(400).json({ error: "Missing payload" });
    }

    const verifyPayload = await auth.verifyPayload({ payload: payload.payload, signature: payload.signature });

    if (verifyPayload.valid) {
      const jwt = await auth.generateJWT({ payload: verifyPayload.payload });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );

      return res.status(200).json({ valid: true });
    } else {
      return res.status(401).json({ valid: false, error: "Invalid payload" });
    }
  } catch (err) {
    return res.status(500).json({
      valid: false,
      error: "Failed to verify user",
      details: err.message,
    });
  }
}
