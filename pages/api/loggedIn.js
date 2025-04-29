import cookie from "cookie";
import { auth } from "@/library/thirdwebClient";

export default async function handler(req, res) {
  // const cookies = cookie.parse(req.headers.cookie || "");
  const token = null;

  if (!token) {
    return res.status(200).json({ "loggedIn": false });
  }

  try {
    const user = await auth.authenticate(token);
    return res.status(200).json({ "loggedIn": true, user });
  } catch (err) {
    return res.status(200).json({ "loggedIn": false });
  }
}