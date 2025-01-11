"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define your Zod schema for validation
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [pwType, setPwType] = useState("password");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const togglePwType = useCallback(() => {
    setPwType((prev) => (prev === "password" ? "text" : "password"));
  }, []);

  const goTo = (url: string) => {
    router.push(url);
  };

  const { mutate: logIn, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token);
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      setError("Invalid username or password. Please try again.");
    },
  });

  const onSubmit = (data: FormData) => {
    if (!data.username || !data.password) {
      setError("Username and password are required.");
      return;
    }
    setError(null);
    logIn({ user_name: data.username, password: data.password });
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      <div className="w-full relative">
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <Image
            className="my-5 lg:hidden"
            src={"/images/logo.png"}
            alt="Logo"
            width={120}
            height={120}
          />
          <h1 className="my-10 hidden bg-gradient-to-r from-[#b2ff54] via-[#57b400] to-[#87600c] bg-clip-text py-[10px] text-4xl font-black uppercase text-transparent lg:block">
            WELCOME
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="w-full px-2 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
                <UserIcon className="text-active" aria-label="Username Icon" />
                <Input
                  placeholder="Username"
                  {...register("username")}
                  aria-label="Username"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="w-full px-2 flex items-center justify-between gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
                <div className="flex items-center gap-1">
                  <LockIcon
                    className="text-active"
                    aria-label="Password Icon"
                  />
                  <Input
                    type={pwType === "password" ? "password" : "text"}
                    placeholder="Password"
                    {...register("password")}
                    aria-label="Password"
                  />
                </div>
                {pwType === "password" ? (
                  <EyeOffIcon
                    onClick={togglePwType}
                    className="text-active cursor-pointer"
                    aria-label="Show Password"
                  />
                ) : (
                  <EyeIcon
                    onClick={togglePwType}
                    className="text-active cursor-pointer"
                    aria-label="Hide Password"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="text-center">
              <Button
                type="submit"
                disabled={isPending}
                className="w-max border px-16 mt-6 bg-active border-active text-black hover:text-active text-base font-bold rounded-full"
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </div>

        <div className="absolute bottom-0 w-full mt-10">
          <div className="flex justify-center w-full mx-auto">
            <Image
              src={"/images/leftPattern.svg"}
              width={50}
              height={50}
              alt="Left Pattern"
            />
            <p className="bg-secondary pt-2">New member ?</p>
            <Image
              src={"/images/rightPattern.svg"}
              width={50}
              height={50}
              alt="Right Pattern"
            />
          </div>
          <div className="text-center bg-secondary py-10">
            <Button
              onClick={() => goTo("/register")}
              className="px-12 border bg-black hover:bg-white border-white text-white hover:text-black font-bold rounded-full"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:inline-block bg-[url('/images/authBg.png')] w-full h-full bg-cover bg-center bg-no-repeat"></div>
    </div>
  );
};

export default LoginPage;
