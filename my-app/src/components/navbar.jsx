"use client";
import { signOut } from "next-auth/react";
import { CircleUserRound, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import SearchModel from "./search-model";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
const Navbar = ({ user }) => {
  const router = useRouter();
  const [open, Setopen] = useState(false);
  const [modalstate, setmodalstate] = useState(-1);

  const openstep = (step) => {
    if (!open) {
      Setopen(true);
      setmodalstate(step);
    }
  };
  return (
    <div className="flex justify-between py-3 bg-muted px-7 items-center">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Icons.logo className="w-6 h-6" />
        <p className="font-bold">airbnb</p>
      </div>
      <div className="hidden md:flex gap-3 bg-white rounded-full px-3 py-[4px] items-center border-2 border-gray-300">
        <div
          className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full cursor-pointer"
          onClick={() => openstep(0)}
        >
          Location
        </div>
        <div
          className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full cursor-pointer"
          onClick={() => openstep(1)}
        >
          Date
        </div>
        <div
          className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full cursor-pointer"
          onClick={() => openstep(2)}
        >
          Details
        </div>
        <div
          className="bg-red-400 rounded-full p-2 text-white hover:scale-105 transition-transform duration-200 delay-100 cursor-pointer"
          onClick={() => openstep(0)}
        >
          <Search />
        </div>
      </div>
      {user ? (
        <div>
          <UserComp user={user} />
        </div>
      ) : (
        <Button
          onClick={() => router.push("/sign-in")}
          className="bg-red-400 rounded-full p-2 text-white hover:scale-105 transition-transform duration-200 delay-100 cursor-pointer"
        >
          Sign In
        </Button>
      )}
      <SearchModel
        key={modalstate}
        open={open}
        setopen={Setopen}
        modelstate={modalstate}
      />
    </div>
  );
};

const UserComp = ({ user }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUserRound className="text-red-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Hello, {user.name}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/bookmarks")}>
          Favorites
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/bookings")}>
          Bookings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/become-a-host")}>
          Create Property
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/properties")}>
          Properties
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut({ callbackUrl: "/" });
            toast({
              title: "Success",
              description: "Logged out successfully",
            });
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
