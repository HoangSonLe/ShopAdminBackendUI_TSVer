"use client";
import { toastErrorCustom } from "@/app/(common)/commonFunc";
import { signIn } from "@/app/api/auth/auth.api";
import { SiteLogo } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const schema = z.object({
  user: z.string().nonempty({ message: "String cannot be empty" }).refine(value => value.trim().length > 0, {
    message: "String cannot be whitespace",
  }),
  password: z.string().min(4),
});
const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      userName: "dashtail@codeshaper.net",
      password: "password",
      rememberMe: false
    },
  });
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const onSubmit = (data : LoginRequest ) => {
    startTransition(async () => {
      let response : Acknowledgement<TokenModel> = await signIn({
        userName: data.userName,
        password: data.password,
        rememberMe: false,
      });
      if (response.isSuccess) {
        toast.success("Login Successful");
        window.location.assign("/dashboard");
        reset();
      } else if (response.errorMessageList.length > 0) {
        toastErrorCustom(response.errorMessageList);
      }
    });
  };
  return (
    <div className="w-full ">
      <Link href="/dashboard" className="inline-block">
        <SiteLogo className="h-10 w-10 2xl:h-14 2xl:w-14 text-primary" />
      </Link>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Enter the information you entered while registering.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="2xl:mt-7 mt-8">
        <div className="relative">
          <Input
            removeWrapper
            id="userName"
            size={!isDesktop2xl ? "xl" : "lg"}
            placeholder=" "
            disabled={isPending}
            {...register("userName")}
            className={cn("peer", {
              "border-destructive": errors.userName,
            })}
          />
          <Label
            htmlFor="userName"
            className={cn(
              " absolute text-base text-default-600  rounded-t duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
              {
                " text-sm ": isDesktop2xl,
              }
            )}
          >
            User Name
          </Label>
        </div>
        {errors.userName && (
          <div className=" text-destructive mt-2">{errors.userName.message}</div>
        )}

        <div className="relative mt-6">
          <Input
            removeWrapper
            type={passwordType === "password" ? "password" : "text"}
            id="password"
            size={!isDesktop2xl ? "xl" : "lg"}
            placeholder=" "
            disabled={isPending}
            {...register("password")}
            className={cn("peer", {
              "border-destructive": errors.password,
            })}
          />
          <Label
            htmlFor="password"
            className={cn(
              " absolute text-base  rounded-t text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
              {
                " text-sm ": isDesktop2xl,
              }
            )}
          >
            Password
          </Label>
          <div
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
            onClick={togglePasswordType}
          >
            {passwordType === "password" ? (
              <Icon icon="heroicons:eye" className="w-4 h-4 text-default-400" />
            ) : (
              <Icon
                icon="heroicons:eye-slash"
                className="w-4 h-4 text-default-400"
              />
            )}
          </div>
        </div>
        {errors.password && (
          <div className=" text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="mt-5  mb-6 flex flex-wrap gap-2">
          <div className="flex-1 flex  items-center gap-1.5 ">
            <Checkbox
              size="sm"
              className="border-default-300 mt-[1px]"
              id="rememberMe"
              {...register("rememberMe")}
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
          <Link href="/auth/forgot3" className="flex-none text-sm text-primary">
            Forget Password?
          </Link>
        </div>
        <Button
          className="w-full"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default LogInForm;
