"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SearchGames from "../widgets/SearchGames";
import MobileSearchGames from "../widgets/MobileSearchGames";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/@types/language";

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

  const onSelectLanguage = (value: Language) => {
    setLanguage(value);
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
        <SheetContent side="left" className="w-full sm:max-w-xs">
          <div className="flex flex-col gap-2">
            <div className="">
              <MobileSearchGames />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div
        className={`flex w-full flex-row justify-between items-center ${className}`}
      >
        <div>
          <SearchGames />
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
          {/* <div>
            <Button
              className="border bg-active border-active text-black hover:text-active font-bold rounded-full"
              onClick={() => router.push("/register")}
            >
              Sign Up
            </Button>
          </div>
          <div>
            <Button
              className="border border-active text-active rounded-full font-bold"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
