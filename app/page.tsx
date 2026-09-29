import { Calculator } from "@/components/calculator";
import { Cta } from "@/components/cta";
import { FinePrint } from "@/components/fine-print";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Loop } from "@/components/loop";
import { Nav } from "@/components/nav";
import { Rules } from "@/components/rules";
import { SpecStrip } from "@/components/spec-strip";
import { Versus } from "@/components/versus";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <SpecStrip />
        <Loop />
        <Calculator />
        <Versus />
        <Rules />
        <FinePrint />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
