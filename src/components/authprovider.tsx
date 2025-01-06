"use client";

import SideMenu from "./navigation/sidemenu";
import TopNav from "./navigation/topnav";
import { usePathname } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  return !isAuthRoute ? (
    <main className="grid min-h-screen w-full lg:grid-cols-[20%_1fr]">
      <SideMenu className="h-screen sticky top-0" />

      <div className="flex flex-col h-screen">
        <TopNav className="sticky top-0 z-10" />

        <div className="flex-1 overflow-y-auto w-full h-full">{children}</div>
      </div>
    </main>
  ) : (
    <main className="min-h-screen w-full">
      <div className="h-full w-full">{children}</div>
    </main>
  );
};

export default AuthProvider;
