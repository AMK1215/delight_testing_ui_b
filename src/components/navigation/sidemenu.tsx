"use client";

import { fetchContractInformation } from "@/services/contactService";
import { useQuery } from "@tanstack/react-query";
import { GiftIcon, HomeIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { RiAdvertisementLine } from "react-icons/ri";
import { Skeleton } from "../ui/skeleton";

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

  const { data: contact, isLoading: isLoadingContact } = useQuery({
    queryKey: ["GET_CONTACT_INFO"],
    queryFn: fetchContractInformation,
  });

  return (
    <div
      className={`hidden border-r bg-muted/40 lg:block border-gray-800 ${className}`}
    >
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
    </div>
  );
};

export default SideMenu;
