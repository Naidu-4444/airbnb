import getreservations from "@/app/actions/getreservations";
import listingbyid from "@/app/actions/listingbyid";
import Reservations from "@/components/reservations";
import useCountries from "@/hooks/useCountries";
import { categories } from "@/static/config";
import { Baby, House, UserRound } from "lucide-react";
import Image from "next/image";

const Listpage = async ({ params }) => {
  const listing = await listingbyid(params.id);
  const reservations = await getreservations(params.id);
  const { getbyValue } = useCountries();
  const country = getbyValue(listing.locationValue);
  const category = categories.find((item) => item.label == listing.category);
  return (
    <div className="min-h-screen overflow-hidden p-4 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1 ml-[22.2%]">
        <h1 className="text-4xl font-semibold">{listing.title}</h1>
        <p className="text-gray-500 text-lg">{country.label}</p>
      </div>

      <div className="flex justify-center">
        <Image
          className="rounded-xl w-full h-[57vh] max-w-[800px]"
          src={listing.imageSrc}
          alt={listing.title}
          width={600}
          height={500}
        />
      </div>
      <div className="grid grid-cols-5 gap-10">
        <div className="col-span-5 md:col-span-3 flex flex-col gap-7">
          <div className="flex items-center gap-2">
            {listing.user.image && (
              <Image
                src={listing.user.image}
                alt={listing.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}

            <p className="font-semibold">Hosted by {listing.user.name}</p>
          </div>

          <hr />

          <div
            className="descriptoin"
            dangerouslySetInnerHTML={{
              __html: listing.description.replaceAll(/\n/g, "<br />"),
            }}
          ></div>
          <hr />
          <div className="flex gap-4">
            <span className="p-3 px-5 bg-red-100/40 rounded-lg font-semibold flex flex-col items-center">
              <UserRound /> Guests: {listing.guestCount}
            </span>
            <span className="p-3 px-5 bg-red-100/40 rounded-lg font-semibold flex flex-col items-center">
              <House /> Rooms: {listing.roomCount}
            </span>
            <span className="p-3 px-5 bg-red-100/40 rounded-lg font-semibold flex flex-col items-center">
              <Baby /> Children: {listing.childCount}
            </span>
          </div>

          <hr />

          <div className="flex gap-2 items-center">
            <category.icon className="w-10 h-10" />
            <div>
              <p className="font-semibold">{category.label}</p>
              <p>{category.label} is the specialty of this property</p>
            </div>
          </div>

          <hr />
          <div>
            <span className="font-extrabold text-2xl">
              <span className="text-red-400">air</span>cover
            </span>
            <p>
              Every booking includes free portection from Hostin cancellation,
              listing inaccuracies, and other issues like trouble checking in.
            </p>
            <a className="font-bold underline">Learn more</a>
          </div>
        </div>
        <div className="col-span-5 md:col-span-2">
          <div className="p-4 border rounded-lg shadow-sm w-fit">
            <p className="text-2xl font-bold">₹{listing.price}</p>
            <p className="text-gray-600">per night</p>
            <Reservations
              price={listing.price}
              listid={listing.id}
              reservations={reservations}
              listingName={listing.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listpage;
