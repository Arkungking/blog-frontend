"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();

  const notAllowedPath = ["/forgot-password", "/reset-password", "/login"];
  if (notAllowedPath.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <header className="container mx-auto flex items-center justify-between p-4">
      <Link href="/">
        <h1 className="text-xl font-bold">Logo</h1>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
        {/* Authenticated */}
        {!!session.data?.user && (
          <>
            <Link href="/write">Write</Link>
            <p>Welcome! {session.data?.user.email}</p>
            <Button
              variant="destructive"
              onClick={() => signOut({ redirect: false })}
            >
              Sign Out
            </Button>
          </>
        )}

        {/* Unaunthenticated */}
        {!session.data?.user && (
          <>
            <Link href="/login">
              <Button variant="destructive">Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
