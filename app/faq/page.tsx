import type { Metadata } from "next";
import { Faq } from "@/components/sections/Faq";
import { Outro } from "@/components/sections/Outro";

export const metadata: Metadata = {
  title: "FAQ · Fair Fees",
  description: "Where does the 3% go? Answers about $FEES, the splitter contract and 60-second ETH payouts.",
};

export default function FaqPage() {
  return (
    <>
      <main>
        <Faq />
        <Outro />
      </main>
    </>
  );
}
