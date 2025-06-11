"use client";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
const Login = ({ origin = "signIn" }) => {
  const [loading, setloading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onsubmit = (data) => {
    setloading(true);
    try {
      if (origin == "signIn") {
        signIn("credentials", {
          ...data,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            console.log("logged in successfully");
            router.refresh();
          } else if (callback?.error) {
            throw new Error(callback?.error);
          }
        });
      } else {
        axios.post("/api/auth/register", data).then(() => {
          console.log("registered successfully");
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="space-y-4 flex justify-center flex-col gap-3 mx-[40%] w-[400px] h-[600px]">
      {origin == "signUp" && (
        <Input placeholder="Name" type="text" {...register("name")} />
      )}
      <Input placeholder="Email" type="email" {...register("email")} />
      <Input placeholder="Password" type="password" {...register("password")} />

      <div className="flex gap-2 flex-col">
        <Button
          type="submit"
          className="px-4 py-2 rounded-md"
          onClick={handleSubmit(onsubmit)}
        >
          {origin}
        </Button>
        <Button
          type="submit"
          className="px-4 py-2 rounded-md"
          onClick={() => signIn("google")}
        >
          <Icons.google className="w-6 h-6" /> {origin} with Google
        </Button>
        {origin == "signIn" ? (
          <span>
            If you don't have an account{" "}
            <Link href="/sign-up">
              <span className="underline">Sign up</span>
            </Link>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="underline">Sign in</span>
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};
export default Login;
