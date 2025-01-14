"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  GiftIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// import SearchGames from "../widgets/SearchGames";
// import MobileSearchGames from "../widgets/MobileSearchGames";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/@types/language";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchContractInformation } from "@/services/contactService";
import { translations } from "@/configs/translations";
import { RiAdvertisementLine } from "react-icons/ri";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import UserInfo from "./UserInfo";

interface SideMenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface TopNavProps {
  className?: string;
}

interface LangOptions {
  label: string;
  value: Language;
  icon: string;
}

const language_options = [
  {
    icon: "my-icon.png",
    label: "Myanmar",
    value: "my",
  },
  {
    icon: "en-icon.png",
    label: "English",
    value: "en",
  },
  {
    icon: "th-icon.png",
    label: "Thailand",
    value: "th",
  },
  {
    icon: "zh-icon.png",
    label: "Chinese",
    value: "zh",
  },
] as LangOptions[];

const TopNav = ({ className }: TopNavProps) => {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [showDialog, setShowDialog] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Control sheet state

  const isHomeActive =
    pathname === "/" ||
    pathname.startsWith("/hot-games") ||
    pathname.startsWith("/game-type");

  const { data: contact, isLoading: isLoadingContact } = useQuery({
    queryKey: ["GET_CONTACT_INFO"],
    queryFn: fetchContractInformation,
  });

  const sideMenuItems = [
    {
      label: translations.home[language],
      path: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      label: translations.videoAds[language],
      path: "/video-ads",
      icon: <RiAdvertisementLine className="h-5 w-5" />,
    },
    {
      label: translations.promotions[language],
      path: "/promotions",
      icon: <GiftIcon className="h-5 w-5" />,
    },
    {
      label: translations.account[language],
      path: "/profile",
      icon: <UserIcon className="h-5 w-5" />,
    },
  ] as SideMenuItem[];

  const onSelectLanguage = (value: Language) => {
    setLanguage(value);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6 border-gray-800">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-xs">
          <div className="flex flex-col gap-2 justify-between h-full">
            <div className="flex h-[60px] items-center px-6">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold"
                prefetch={false}
              >
                <span className="">APP NAME</span>
              </Link>
            </div>
            <div className="p-5">
              <UserInfo />
            </div>
            <div className="flex-grow">
              <nav className="grid items-start px-4 text-sm font-medium space-y-2">
                {sideMenuItems.map((item, idx) => {
                  const isActive =
                    item.path === "/" ? isHomeActive : pathname === item.path;
                  return (
                    <Link
                      key={idx}
                      href={item.path}
                      className={`flex items-center gap-3 rounded px-3 py-2 ${
                        isActive
                          ? "bg-secondary text-active"
                          : "text-gray hover:text-active hover:bg-secondary"
                      }`}
                      prefetch={false}
                      onClick={() => setIsSheetOpen(false)} // Close the sheet on click
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="mb-7">
              {isLoadingContact ? (
                <div className="flex flex-row items-center justify-center w-full space-x-4">
                  <Skeleton className="h-7 w-7 rounded-md bg-secondary" />
                  <Skeleton className="h-7 w-7 rounded-md bg-secondary" />
                  <Skeleton className="h-7 w-7 rounded-md bg-secondary" />
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center w-full space-x-4">
                  {contact?.map((c, idx) => (
                    <Link key={idx} href={c.value} target="_blank">
                      {c.name === "Facebook" && (
                        <img
                          src={"/icons/facebook.png"}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      {c.name === "Viber" && (
                        <img
                          src={"/icons/viber.png"}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      {c.name === "Telegram" && (
                        <img
                          src={"/icons/telegram.png"}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div
        className={`flex w-full flex-row justify-between items-center ${className}`}
      >
        <div>
          {/* <SearchGames /> */}
          <span>APP LOGO</span>
        </div>
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
              <DropdownMenuContent className="w-56 bg-secondary">
                <DropdownMenuGroup>
                  {language_options.map((lang, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      className="hover:border hover:border-active"
                      onClick={() => onSelectLanguage(lang.value)}
                    >
                      <div className="flex flex-row justify-between w-full">
                        <span>{lang.label}</span>
                        <img
                          alt={lang.value}
                          src={`/icons/${lang.icon}`}
                          className="h-5 w-6"
                        />
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <button
              className="bg-secondary rounded-md p-2"
              onClick={() => setShowDialog(true)}
            >
              <LogOutIcon className="h-5 w-5 text-gray-200" />
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={showDialog}
        onOpenChange={(isOpen) => !isOpen && setShowDialog(false)}
      >
        <DialogContent>
          <div className="flex flex-col space-y-3">
            <span>Are you sure you would like to log out?</span>

            <div className="flex flex-row justify-end items-center space-x-3">
              <Button
                type="button"
                className="border border-active hover:bg-secondary"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-active text-black hover:text-white hover:bg-secondary hover:border hover:border-active"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default TopNav;
