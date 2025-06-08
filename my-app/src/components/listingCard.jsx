import useCountries from "@/hooks/useCountries";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ListingCard({ listing }) {
  const { getbyValue } = useCountries();
  const countryDetails = getbyValue(listing.locationValue);
  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="flex flex-col justify-center shadow p-2 rounded-lg border-2 border-gray-200">
        <div className="pr-1">
          <Image
            className="object-cover w-full h-full rounded-lg"
            src={listing.imageSrc}
            alt={listing.title}
            width={300}
            height={200}
          />
        </div>

        <h1 className="font-semibold text-lg capitalize pt-2">
          {listing.title}
        </h1>
        <p>{listing.description}</p>
        <div className="flex gap-1 items-center">
          <IndianRupee className="w-5 h-5" /> <p>{listing.price}</p>
          <p>per Night</p>
        </div>

        <p className="font-thin text-gray-500">{countryDetails.label}</p>
      </div>
    </Link>
  );
}
