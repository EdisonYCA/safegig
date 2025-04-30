import * as cookie from "cookie";

export default async function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    })
  );

  return res.status(200).json({ loggedOut: true });
}