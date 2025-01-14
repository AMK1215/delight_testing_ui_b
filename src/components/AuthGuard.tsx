"use client";

import { useAuth } from "@/context/AuthContext";
import TopNav from "./navigation/TopNav";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./ui/loading";
import { isEmpty } from "lodash";
import SideBar from "./navigation/SideBar";

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
    if (isEmpty(localStorage.getItem("token")) && !isAuthRoute)
      router.push("/login");
  }, [user, isLoading, isAuthRoute, router]);

  return (
    <Loading loading={isLoading}>
      {isAuthRoute ? (
        <main className="min-h-screen w-full">
          <div className="h-full w-full">{children}</div>
        </main>
      ) : (
        <main className="grid min-h-screen w-full lg:grid-cols-[20%_1fr]">
          <SideBar className="h-screen sticky top-0" />
          <div className="flex flex-col h-screen">
            <TopNav className="sticky top-0 z-10" />
            <div className="flex-1 overflow-y-auto w-full h-full">
              {children}
            </div>
          </div>
        </main>
      )}
    </Loading>
  );
};

export default AuthGuard;
