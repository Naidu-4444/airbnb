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
      <div className="p-4">
        <div className="mx-3">
          <CategoryHandler />
        </div>
        <div className="modal__content p-5 bg-white w-[200px] md:w-3/5 min-h-[100px] border-gray-300 border-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg">
          <div className="flex">
            <div>
              <h1 className="font-semibold text-gray-600 mb-3">
                No listings found
              </h1>
              <p className="text-gray-600">
                Try changing the filters or search for something else
              </p>
            </div>
            <div>
              <Link href="/">
                <X className="float-right cursor-pointer absolute top-4 right-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-4">
      <div className="mx-3">
        <CategoryHandler />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3">
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
