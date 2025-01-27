"use client"

import { NavbarItem, Button, Spinner} from "@heroui/react";
import {Avatar} from "@heroui/avatar";
import {Popover, PopoverTrigger, PopoverContent} from "@heroui/popover";
import { signOutAction } from "@/actions/sign-out";
import { signInAction } from "@/actions/sign-in";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
  const {data: session, status} = useSession()
  let authContent: React.ReactNode;
  if (status === "loading") {
    authContent = (
      <Spinner />
    )
    
  } else if(session?.user) {
    authContent = (
    <Popover>
      <PopoverTrigger>
        <Avatar src={session.user.image || ""} />
      </PopoverTrigger>
      <PopoverContent>
        <form className="p-2" action={signOutAction}>
          <Button type="submit" color="secondary" variant="bordered">
            Sign Out
          </Button>
        </form>
      </PopoverContent>
    </Popover>
    )
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={signInAction}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <Button color="secondary">
            Sign Up
          </Button>
        </NavbarItem>
      </>
    )
  }
  return authContent;
}
