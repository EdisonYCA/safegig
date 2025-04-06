import Navbar from "@/components/landing/Navbar";
import Section from "@/components/landing/Section";
export default function Home() {
  return (
    <>
      <Navbar />
      <Section />
      <Section 
      feature 
      lottie="https://lottie.host/ffdfc47d-d14f-43f9-925a-0a4205870728/EFp8RcgETf.lottie" 
      title="Get Your Project Built & Pay In Your Favorite Crypto"
      description="SafeGig supports tokens on the Ethereum, Binance Smart Chain, TRON and Polygon networks, providing fast, efficient settlement between Customers and Freelancers anywhere in the world."
      featureTitle="CRYPTO PAYMENTS"
      left
      />
      <Section 
      feature
      lottie="https://lottie.host/8cb092d9-0408-4dff-83b2-6ec4264529d0/KJA1IhHZzJ.lottie" 
      title="Trustless Agreements With Smart Contracts"
      description="Work with confidence — all agreements are enforced by blockchain smart contracts, ensuring fair milestones, secure payments, and no third-party interference."
      featureTitle="SMART CONTRACTS"
      />
    </>
  );
}
