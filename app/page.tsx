import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/sections/Hero";
import { Loop } from "@/components/sections/Loop";
import { Versus } from "@/components/sections/Versus";
import { Calculator } from "@/components/sections/Calculator";
import { Receipts } from "@/components/sections/Receipts";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { Outro } from "@/components/sections/Outro";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <Loop />
        <Versus />
        <Calculator />
        <Receipts />
        <HowToBuy />
        <Outro />
      </main>
    </>
  );
}
