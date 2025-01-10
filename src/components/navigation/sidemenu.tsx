"use client";

import { ContactIcon, GiftIcon, HomeIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { RiAdvertisementLine } from "react-icons/ri";
// import { Button } from "../ui/button";

interface SideMenuItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const sideMenuItems = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    label: "Video Ads",
    path: "/video-ads",
    icon: <RiAdvertisementLine className="h-5 w-5" />,
  },
  {
    label: "Promotions",
    path: "/promotions",
    icon: <GiftIcon className="h-5 w-5" />,
  },
  {
    label: "Account",
    path: "/profile",
    icon: <UserIcon className="h-5 w-5" />,
  },
  {
    label: "Contact",
    path: "/contact",
    icon: <ContactIcon className="h-5 w-5" />,
  },
] as SideMenuItem[];

interface SideMenuProps {
  className?: string;
}

const SideMenu = ({ className }: SideMenuProps) => {
  const pathname = usePathname();

  const isHomeActive =
    pathname === "/" ||
    pathname.startsWith("/hot-games") ||
    pathname.startsWith("/game-type");

  const router = useRouter();

  return (
    <div
      className={`hidden border-r bg-muted/40 lg:block border-gray-800 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <span className="">APP NAME</span>
          </Link>
        </div>
        {/* <div className="bg-secondary rounded-md shadow flex flex-col justify-center items-center p-5 m-4 space-y-3">
          <span className="text-lg">Welcome to Login</span>
          <Button
            className="border border-active text-active rounded-full"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div> */}
        <div className="flex-1">
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
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
