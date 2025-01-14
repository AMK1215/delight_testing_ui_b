// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   EyeIcon,
//   EyeOffIcon,
//   LockIcon,
//   PhoneIcon,
//   UserCogIcon,
//   UserIcon,
// } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useCallback, useState } from "react";

// const RegisterPage = () => {
//   const router = useRouter();
//   const [pwType, setPwType] = useState("password");
//   const togglePwType = useCallback(() => {
//     setPwType((prev) => (prev === "password" ? "text" : "password"));
//   }, []);
//   const goTo = (url: string) => {
//     router.push(url);
//   };
//   return (
//     <div className="min-h-screen lg:min-h-[130vh] w-full grid lg:grid-cols-2">
//       <div className="w-full  relative flex flex-col items-center justify-center ">
//         <div className="min-h-max lg:min-h-[130vh] flex flex-col items-center justify-center">
//           <Image
//             className="my-10 lg:hidden"
//             src={"/images/logo.png"}
//             alt="Logo"
//             width={120}
//             height={120}
//           />
//           <h1 className="my-10 hidden bg-gradient-to-r from-[#b2ff54] via-[#57b400] to-[#87600c] bg-clip-text py-[10px] text-4xl font-black uppercase text-transparent lg:block">
//             WELCOME
//           </h1>
//           <form>
//             <div className="w-full px-2 mb-5 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
//               <PhoneIcon className="text-active" />
//               <Input placeholder="Mobile Number" />
//             </div>
//             <div className="w-full px-2 mb-5 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
//               <UserIcon className="text-active" />
//               <Input placeholder="Username" />
//             </div>
//             <div className="w-full px-2 mb-5 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
//               <UserIcon className="text-active" />
//               <Input placeholder="Name" />
//             </div>
//             <div className="w-full px-2 mb-5 flex items-center justify-between gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
//               <div className="flex items-center gap-1">
//                 <LockIcon className="text-active" />
//                 <Input
//                   type={pwType === "password" ? "password" : "text"}
//                   placeholder="Password"
//                 />
//               </div>
//               {pwType === "password" ? (
//                 <EyeOffIcon onClick={togglePwType} className="text-active" />
//               ) : (
//                 <EyeIcon onClick={togglePwType} className="text-active" />
//               )}
//             </div>
//             <div className="w-full px-2 mb-5 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
//               <UserCogIcon className="text-active" />
//               <Input placeholder="Agent Code" />
//             </div>
//             <div className="text-center">
//               <Button className="w-max border px-16 mt-6 bg-active border-active text-black hover:text-active text-base font-bold rounded-full">
//                 Sign Up
//               </Button>
//             </div>
//           </form>
//         </div>

//         <div className=" w-full mt-10">
//           <div className="flex justify-center w-full mx-auto">
//             <Image
//               src={"/images/leftPattern.svg"}
//               width={50}
//               height={50}
//               alt="Left Pattern"
//             />
//             <p className="bg-secondary pt-2 text-[15px] sm:text-base">
//               Already have an account ?
//             </p>
//             <Image
//               src={"/images/rightPattern.svg"}
//               width={50}
//               height={50}
//               alt="Right Pattern"
//             />
//           </div>
//           <div className="text-center bg-secondary py-10">
//             <Button
//               onClick={() => goTo("/login")}
//               className="px-12 border bg-black hover:bg-white border-white text-white hover:text-black font-bold rounded-full"
//             >
//               Login
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div className="hidden lg:inline-block bg-[url('/images/authBg.png')] w-full h-full bg-cover bg-center bg-no-repeat"></div>
//     </div>
//   );
// };

// export default RegisterPage;
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import {
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  LockIcon,
  PhoneIcon,
  UserCogIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Validation schema using Zod
const registerSchema = z
  .object({
    mobileNumber: z
      .string()
      .min(10, { message: "Mobile number must be at least 10 digits." })
      .regex(/^\d+$/, { message: "Mobile number must contain only digits." }),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirm_password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    agentCode: z.string().min(1, { message: "Referral code is required!" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [pwType, setPwType] = useState("password");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const togglePwType = useCallback(() => {
    setPwType((prev) => (prev === "password" ? "text" : "password"));
  }, []);

  const { mutate: registerUserMutation, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: ({ user, token }) => {
      localStorage.setItem("token", token);
      console.log(user);
      toast("Welcome to the game!", {
        style: {
          background: "bg-active",
        },
      });
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      setError(error.message);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setError(null);
    registerUserMutation({
      name: data.name,
      password: data.password,
      password_confirmation: data.confirm_password,
      phone: data.mobileNumber,
      referral_code: data.agentCode,
    });
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
            REGISTER
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Mobile Number */}
            <div className="space-y-2">
              <div className="w-full px-2 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
                <PhoneIcon className="text-active" aria-label="Phone Icon" />
                <Input
                  placeholder="Mobile Number"
                  {...register("mobileNumber")}
                  aria-label="Mobile Number"
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <div className="w-full px-2 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
                <UserIcon className="text-active" aria-label="Name Icon" />
                <Input
                  placeholder="Name"
                  {...register("name")}
                  aria-label="Name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <div className="w-full px-2 flex items-center justify-between gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
                <div className="flex items-center gap-1">
                  <LockIcon
                    className="text-active"
                    aria-label="Confirm Password Icon"
                  />
                  <Input
                    type={pwType === "password" ? "password" : "text"}
                    placeholder="Confirm Password"
                    {...register("confirm_password")}
                    aria-label="Confirm Password"
                  />
                </div>
                {pwType === "password" ? (
                  <EyeOffIcon
                    onClick={togglePwType}
                    className="text-active cursor-pointer"
                    aria-label="Show Confirm Password"
                  />
                ) : (
                  <EyeIcon
                    onClick={togglePwType}
                    className="text-active cursor-pointer"
                    aria-label="Hide Confirm Password"
                  />
                )}
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Agent Code */}
            <div className="space-y-2">
              <div className="w-full px-2 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
                <UserCogIcon
                  className="text-active"
                  aria-label="Agent Code Icon"
                />
                <Input
                  placeholder="Referral code"
                  {...register("agentCode")}
                  aria-label="Agent Code"
                />
              </div>
              {errors.agentCode && (
                <p className="text-red-500 text-sm">
                  {errors.agentCode.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                disabled={isPending}
                className="w-max border px-16 mt-6 bg-active border-active text-black hover:text-active text-base font-bold rounded-full"
              >
                {isPending ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  "Sign Up"
                )}
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
            <p className="bg-secondary pt-2">Already have an account ?</p>
            <Image
              src={"/images/rightPattern.svg"}
              width={50}
              height={50}
              alt="Right Pattern"
            />
          </div>
          <div className="text-center bg-secondary py-10">
            <Button
              onClick={() => router.push("/login")}
              className="px-12 border bg-black hover:bg-white border-white text-white hover:text-black font-bold rounded-full"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:inline-block bg-[url('/images/authBg.png')] w-full h-full bg-cover bg-center bg-no-repeat"></div>
    </div>
  );
};

export default RegisterPage;
