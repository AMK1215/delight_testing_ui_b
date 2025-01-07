'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, LockIcon, MoveLeftIcon, PhoneIcon, UserCogIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [pwType, setPwType] = useState('password');
  const togglePwType = useCallback(() => {
    setPwType((prev) => prev === 'password' ? 'text' : 'password')
  }, [])
  const goTo = (url: string) => {
    router.push(url);
  }
  return (
    <div className="min-h-screen lg:min-h-[130vh] w-full grid lg:grid-cols-2">
      <div className="w-full  relative flex flex-col items-center justify-center ">
      <MoveLeftIcon onClick={()=>history.back()} className="cursor-pointer text-active absolute top-4 left-4" />
        <div className="min-h-max lg:min-h-[130vh] flex flex-col items-center justify-center">
          <Image className="my-10 lg:hidden" src={"/images/logo.png"} alt="Logo" width={120} height={120} />
          <h1 className="my-10 hidden bg-gradient-to-r from-[#b2ff54] via-[#57b400] to-[#87600c] bg-clip-text py-[10px] text-4xl font-black uppercase text-transparent lg:block">WELCOME</h1>
          <form >
            <div className="w-full px-2 mb-5 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
              <PhoneIcon className="text-active" />
              <Input placeholder="Mobile Number" />
            </div>
            <div className="w-full px-2 mb-5 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
              <UserIcon className="text-active" />
              <Input placeholder="Username" />
            </div>
            <div className="w-full px-2 mb-5 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
              <UserIcon className="text-active" />
              <Input placeholder="Name" />
            </div>
            <div className="w-full px-2 mb-5 flex items-center justify-between gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
              <div className="flex items-center gap-1">
                <LockIcon className="text-active" />
                <Input type={pwType === 'password' ? 'password' : 'text'} placeholder="Password" />
              </div>
              {pwType === 'password' ? <EyeOffIcon onClick={togglePwType} className="text-active" /> :
                <EyeIcon onClick={togglePwType} className="text-active" />
              }
            </div>
            <div className="w-full px-2 mb-5 flex items-center gap-1 border-l-2 border-x-active pb-1 border-b-2 border-y-black">
              <UserCogIcon className="text-active" />
              <Input placeholder="Agent Code" />
            </div>
            <div className="text-center">
              <Button className="w-max border px-16 mt-6 bg-active border-active text-black hover:text-active text-base font-bold rounded-full">
                Sign Up
              </Button>
            </div>
          </form>
        </div>

        <div className=" w-full mt-10">
          <div className="flex justify-center w-full mx-auto">
            <Image src={"/images/leftPattern.svg"} width={50} height={50} alt="Left Pattern" />
            <p className="bg-secondary pt-2 text-[15px] sm:text-base">Already have an account ?</p>
            <Image src={"/images/rightPattern.svg"} width={50} height={50} alt="Right Pattern" />
          </div>
          <div className="text-center bg-secondary py-10">
            <Button onClick={() => goTo('/login')} className="px-12 border bg-black hover:bg-white border-white text-white hover:text-black font-bold rounded-full">
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:inline-block bg-[url('/images/authBg.png')] w-full h-full bg-cover bg-center bg-no-repeat">
      </div>
    </div>
  );
};

export default RegisterPage;
