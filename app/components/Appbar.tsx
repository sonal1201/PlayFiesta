"use client"
import { signIn, signOut, useSession } from "next-auth/react";

import { MailOpen } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Appbar() {
    const session = useSession();
  return (
    <div className="flex justify-between">
        <div>PlayFiesta</div>
        <div>
            {session.data?.user && <Button onClick={() => signOut()}>
            Logout
            </Button>}

            {!session.data?.user &&  <Button onClick={() => signIn()}>
            <MailOpen /> Login with Google
            </Button>}
        </div>
    </div>
  )
}
