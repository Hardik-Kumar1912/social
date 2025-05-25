import React from 'react'
import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from '@clerk/nextjs/server';
import { syncUser } from "@/actions/user.action";

async function Navbar() {

    const user = await currentUser();
    
    const safeUser = user
    ? {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        email: user.emailAddresses?.[0]?.emailAddress,
        // add more fields you need for the client
      }
    : null;

    if(user) await syncUser();

  return (
    <div>
      <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider">
              Social
            </Link>
          </div>

          <DesktopNavbar />
          <MobileNavbar user={safeUser}/>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
