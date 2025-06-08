"use client";
import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activecategory = searchParams.get("category");
  const params = new URLSearchParams(searchParams.toString());
  return (
    <div className="flex justify-evenly overflow-x-auto items-center p-3 w-full border-2 border-gray-300 rounded-lg transition-all duration-300 ease-in-out group gap-6">
      {categories.map((category, index) => {
        return (
          <div
            key={index}
            className={cn(
              "transition-all duration-300 ease-in-out transform group-hover:scale-90 hover:text-red-400  hover:!scale-110 hover:!z-10  cursor-pointer",
              activecategory === category.label && "text-red-400"
            )}
          >
            <div
              className="flex items-center flex-col gap-2"
              onClick={() => {
                params.set("category", category.label);
                router.push(`/?${params.toString()}`);
              }}
            >
              <category.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-sm">{category.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryHandler;
