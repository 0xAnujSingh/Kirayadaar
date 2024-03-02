import React from "react";
import { Button } from "../../../@/components/ui/button";
import { getAuth } from "@firebase/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { HomeIcon } from "@radix-ui/react-icons";
const Navbar = ({ user }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 max-w-5xl items-center mx-auto">
        <a className="mr-6 flex items-center space-x-2" href="/">
          <span className="hidden font-bold sm:inline-block"><HomeIcon className="inline" /> Kirayadaar</span>
        </a>
        <div className="flex grow"></div>
        <nav className="flex items-center gap-6 text-sm">
          <a
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/rooms/new"
          >
            New Room
          </a>
          <a
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/"
          >
            View Rooms
          </a>

          {!user && (
            <a
              className="transition-colors hover:text-foreground/80 text-foreground "
              href="/login"
            >
              Login
            </a>
          )}
          {/* {user && <Button onClick={() => getAuth().signOut()}> Logout</Button>} */}
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger>
                <Avatar>
                  <AvatarFallback className="bg-slate-800 text-white">{user.displayName.substr(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent align="end">
                <MenubarItem>{user.displayName}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => getAuth().signOut()}>Sign Out</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
