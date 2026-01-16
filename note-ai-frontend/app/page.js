import Image from "next/image";
import { Hero } from "@/components/figmaStyles/Hero";
import { Features } from "@/components/figmaStyles/Features";
import { Footer } from "@/components/figmaStyles/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
