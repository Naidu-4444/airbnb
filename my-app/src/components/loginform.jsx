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
import { useToast } from "@/hooks/use-toast";

const Login = ({ origin = "signIn" }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  const onsubmit = (data) => {
    setLoading(true);

    if (origin === "signIn") {
      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        setLoading(false);
        if (callback?.ok) {
          toast({
            title: "Success",
            description: "Logged in successfully!",
          });
          router.push("/");
          router.refresh();
        }

        if (callback?.error) {
          toast({
            title: "Login Failed",
            description: callback.error,
            variant: "destructive",
          });
        }
      });
    } else {
      axios
        .post("/api/auth/register", data)
        .then(() => {
          signIn("credentials", { ...data, redirect: false }).then(
            (callback) => {
              setLoading(false);
              if (callback?.ok) {
                toast({
                  title: "Success",
                  description: "Registration successful!",
                });
                router.push("/");
                router.refresh();
              }
              if (callback?.error) {
                toast({
                  title: "Login Failed",
                  description: callback.error,
                  variant: "destructive",
                });
              }
            }
          );
        })
        .catch((error) => {
          setLoading(false);
          toast({
            title: "Registration Failed",
            description: error.response?.data?.error || "Something went wrong.",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <div className="space-y-4 flex justify-center flex-col gap-3 mx-auto md:mx-[40%] w-[265px] md:w-[400px] h-[600px]">
      {origin === "signUp" && (
        <Input placeholder="Name" type="text" {...register("name")} />
      )}
      <Input placeholder="Email" type="email" {...register("email")} />
      <Input placeholder="Password" type="password" {...register("password")} />

      <div className="flex gap-2 flex-col">
        <Button
          type="submit"
          className="px-4 py-2 rounded-md"
          onClick={handleSubmit(onsubmit)}
          disabled={loading}
        >
          {loading ? "Loading..." : origin}
        </Button>
        <Button
          type="button"
          className="px-4 py-2 rounded-md"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          disabled={loading}
        >
          <Icons.google className="w-6 h-6" /> {origin} with Google
        </Button>

        {origin === "signIn" ? (
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
