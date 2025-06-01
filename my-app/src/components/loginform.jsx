"use client";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./icons";

const Loginform = ({ origin = "signIn" }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="space-y-4">
      {origin == "signUp" && <Input placeholder="Name" type="text" />}
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" register={register} />

      <div className="flex gap-1">
        <Button type="submit" className="px-4 py-2 rounded-full">
          {origin}
        </Button>
        <Button type="submit" className="px-4 py-2 rounded-full">
          <Icons.google className="w-6 h-6" /> {origin} with Google
        </Button>
      </div>
    </div>
  );
};
export default Loginform;
