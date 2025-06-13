"use client";
import useCountries from "@/hooks/useCountries";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { formatMoney } from "./reservations";
import Favorite from "./favorite";
import { useRouter } from "next/navigation";

export default function ListingCard({
  listing,
  showbutton = false,
  onAction,
  reservationData,
  buttonlabel = "Cancel",
  user,
  mark = false,
}) {
  const { getbyValue } = useCountries();
  const countryDetails = getbyValue(listing.locationValue);
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/listing/${listing.id}`)}
      className="cursor-pointer"
    >
      <div className="flex flex-col shadow p-3 rounded-lg border relative border-gray-200  transition hover:shadow-md duration-200">
        <div className="relative w-full h-[180px] overflow-hidden rounded-lg">
          <Image src={listing.imageSrc} alt={listing.title} fill />
          {mark && (
            <div className="absolute top-2 right-2 z-10">
              <Favorite user={user} listingId={listing.id} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between py-2">
          <h1 className="font-semibold text-lg capitalize truncate">
            {listing.title}
          </h1>
          <p className="text-sm text-gray-600 line-clamp-1">
            {listing.description}
          </p>
          {showbutton && reservationData ? (
            <div className="flex items-center gap-1 mt-2">
              <IndianRupee className="w-4 h-4" />
              <p>{formatMoney(reservationData.totalPrice)}</p>
            </div>
          ) : (
            <div className="flex items-center gap-1 mt-2">
              <IndianRupee className="w-4 h-4" />
              <p>{listing.price}</p>
              <span className="text-xs text-gray-500">per night</span>
            </div>
          )}

          <p className="text-sm font-light text-gray-500 mt-1 truncate">
            {countryDetails.label}
          </p>

          {showbutton && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onAction();
              }}
              className="mt-2 w-full"
              variant="destructive"
              size="sm"
            >
              {buttonlabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
