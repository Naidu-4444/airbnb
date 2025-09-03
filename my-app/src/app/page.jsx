import ListingCard from "@/components/listingCard";
import getListing from "./actions/getListing";
import { X } from "lucide-react";
import Link from "next/link";
import CategoryHandler from "@/components/category-handler";
import GetUser from "./actions/getUser";

export default async function Home({ searchParams }) {
  const user = await GetUser();
  const Listings = await getListing({ searchParams });
  if (Listings.length === 0) {
    return (
      <div className="p-8">
        <div className="mx-3">
          <CategoryHandler />
        </div>
        <div className="text-center py-20">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            No exact matches
          </h1>

          <p className="text-gray-500 mb-4">
            Try changing or removing some of your filters.
          </p>

          <Link
            href="/"
            className="text-white bg-rose-500 hover:bg-rose-600 rounded-lg px-4 py-2 transition"
          >
            Clear Filters
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-8">
      <div className="mx-3">
        <CategoryHandler />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-6">
        {Listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              listing={listing}
              user={user}
              mark={true}
            />
          );
        })}
      </div>
    </div>
  );
}
