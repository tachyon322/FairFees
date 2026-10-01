import type { Metadata } from "next";
import { Rules } from "@/components/sections/Rules";
import { Outro } from "@/components/sections/Outro";

export const metadata: Metadata = {
  title: "Rules · Fair Fees",
  description: "Six product rules of $FEES: 3% creator tax, splitter from block 0, buyback off, ETH payouts, pro rata, every 60 seconds.",
};

export default function RulesPage() {
  return (
    <>
      <main>
        <Rules />
        <Outro />
      </main>
    </>
  );
}
