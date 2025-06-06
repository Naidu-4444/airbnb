"use client";
import { Icons } from "./Icons";
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
const Navbar = () => {
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
      <div className="flex items-center gap-1">
        <Icons.logo className="w-6 h-6" />
        <p className="font-bold">airbnb</p>
      </div>
      <div className="flex gap-3 bg-white rounded-full px-3 py-[4px] items-center border-2 border-gray-300">
        <div
          className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full"
          onClick={() => openstep(0)}
        >
          Location
        </div>
        <div
          className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full"
          onClick={() => openstep(1)}
        >
          Date
        </div>
        <div
          className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full"
          onClick={() => openstep(2)}
        >
          Details
        </div>
        <div className="bg-red-400 rounded-full p-2 text-white hover:scale-105 transition-transform duration-200 delay-100">
          <Search />
        </div>
      </div>
      <div>
        <UserComp />
      </div>
      <SearchModel
        key={modalstate}
        open={open}
        setopen={Setopen}
        modelstate={modalstate}
      />
    </div>
  );
};

const UserComp = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUserRound className="text-red-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>My Bookings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
