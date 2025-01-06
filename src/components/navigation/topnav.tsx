"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";

interface TopNavProps {
  className?: string;
}

const TopNav = ({ className }: TopNavProps) => {
  const [language, setLanguage] = useState<string>("english");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  const onSelectLanguage = (value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", value);
      setLanguage(value);
      window.location.reload();
    }
  };

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6 border-gray-800">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <div className="flex flex-col gap-2">
            <div className="flex h-[60px] items-center px-6">
              <Link
                href="#"
                className="flex items-center gap-2 font-semibold"
                prefetch={false}
              >
                {/* <InboxIcon className="h-6 w-6" /> */}
                <span className="">Inbox</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-muted"
                  prefetch={false}
                >
                  {/* <InboxIcon className="h-4 w-4" /> */}
                  Inbox
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  {/* <FileIcon className="h-4 w-4" /> */}
                  Drafts
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  {/* <SendIcon className="h-4 w-4" /> */}
                  Sent
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  {/* <Trash2Icon className="h-4 w-4" /> */}
                  Trash
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  {/* <ArchiveIcon className="h-4 w-4" /> */}
                  Archived
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  {/* <ArchiveXIcon className="h-4 w-4" /> */}
                  Spam
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  {/* <UsersIcon className="h-4 w-4" /> */}
                  Contacts
                </Link>
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div
        className={`flex w-full flex-row justify-between items-center ${className}`}
      >
        <div>hellow</div>
        <div className="space-x-4 flex flex-row items-center">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  alt="myanmar"
                  src={`/icons/${language}-icon.png`}
                  className="h-5 w-6 rounded-full object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="hover:bg-secondary"
                    onClick={() => onSelectLanguage("myanmar")}
                  >
                    <div className="flex flex-row justify-between w-full">
                      <span>Myanmar</span>
                      <img
                        alt="myanmar"
                        src="/icons/myanmar-icon.png"
                        className="h-5 w-6"
                      />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-secondary"
                    onClick={() => onSelectLanguage("english")}
                  >
                    <div className="flex flex-row justify-between w-full">
                      <span>English</span>
                      <img
                        alt="english"
                        src="/icons/english-icon.png"
                        className="h-5 w-6"
                      />
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Button className="border bg-active border-active text-black hover:text-active font-bold rounded-full">
              Sign Up
            </Button>
          </div>
          <div>
            <Button className="border border-active text-active rounded-full font-bold">
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
