"use client";
import { signOut } from "next-auth/react";
import { CircleUserRound, Search, Menu } from "lucide-react";
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
    <div className="flex justify-between py-4 px-8 items-center border-b border-gray-200">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Icons.logo className="w-8 h-8 text-rose-500" />
        <p className="font-bold text-xl text-rose-500 hidden md:block">
          airbnb
        </p>
      </div>
      <div className="hidden md:flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="px-4 py-2 font-semibold" onClick={() => openstep(0)}>
          Location
        </div>
        <div
          className="px-4 py-2 font-semibold border-l border-gray-300"
          onClick={() => openstep(1)}
        >
          Date
        </div>
        <div
          className="px-4 py-2 border-l font-semibold border-gray-300"
          onClick={() => openstep(2)}
        >
          Details
        </div>
        <div
          className="bg-rose-500 rounded-full p-2 text-white m-1"
          onClick={() => openstep(0)}
        >
          <Search />
        </div>
      </div>
      {user ? (
        <div>
          <UserMenu user={user} />
        </div>
      ) : (
        <Button
          onClick={() => router.push("/sign-in")}
          className="bg-rose-500 text-white rounded-full px-4 py-2 hover:bg-rose-600 transition"
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

const UserMenu = ({ user }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition">
          <Menu className="h-5 w-5 text-gray-500" />
          <CircleUserRound className="text-gray-700" />
        </div>
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
