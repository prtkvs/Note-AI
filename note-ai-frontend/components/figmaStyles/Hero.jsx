"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
    const getStarted = () => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/notes";
        } else {
            window.location.href = "/users/register";
        }
    }
  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-10 p-2 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
          Smart Notes. Powered by AI.
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create, organize, and manage your notes effortlessly with AI
          assistance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="text-base px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-shadow"
            onClick={getStarted}
          >
            Get Started
          </Button>
           <Link href="https://github.com/prtkvs/Note-AI" target="_blank">
          <Button variant="outline" className="text-base px-8 bg-gradient-to-r shadow-lg hover:shadow-xl transition-shadow">Check Github</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
