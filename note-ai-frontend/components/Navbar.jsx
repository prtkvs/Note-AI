"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="w-full border-b px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl">
       <h1 className="text-xl font-bold text-indigo-900 from-gray-900 via-blue-900 to-indigo-900">Note AI</h1>
      </Link>

      <div className="flex gap-3">
        {!isAuth ? (
          <div className="flex items-center gap-3">
            <Link href="/users/login">
              <Button variant="outline"  className="text-sm">Login</Button>
            </Link>
            <Link href="/users/register">
              <Button className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">Sign Up</Button>
            </Link>
          </div>
        ) : (
          <>
            <Link href="/notes">
              <Button variant="outline">Notes</Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
