"use client";

import { useAuth } from "@/context/AuthContext";
import SideMenu from "./navigation/sidemenu";
import TopNav from "./navigation/topnav";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  useEffect(() => {
    if (!isLoading && user && isAuthRoute) {
      router.push("/");
    }
  }, [user, isLoading, isAuthRoute, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthRoute ? (
        <main className="min-h-screen w-full">
          <div className="h-full w-full">{children}</div>
        </main>
      ) : (
        <main className="grid min-h-screen w-full lg:grid-cols-[20%_1fr]">
          <SideMenu className="h-screen sticky top-0" />
          <div className="flex flex-col h-screen">
            <TopNav className="sticky top-0 z-10" />
            <div className="flex-1 overflow-y-auto w-full h-full">
              {children}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default AuthGuard;
