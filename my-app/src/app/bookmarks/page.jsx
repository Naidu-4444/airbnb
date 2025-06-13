import Nothing from "@/components/nothing";
import { getFavorites, getListingsByFavoriteIds } from "../actions/favorites";
import ListingCard from "@/components/listingCard";
import GetUser from "../actions/getUser";
import { redirect } from "next/navigation";

export default async function Favoritepage() {
  const user = await GetUser();
  if (!user) {
    redirect("/sign-up");
  }
  const { favoriteIds = [] } = await getFavorites();
  const listings = await getListingsByFavoriteIds(favoriteIds);
  if (!favoriteIds.length) {
    return <Nothing title="No Favorites" des="Add Now" link="/" />;
  }

  return (
    <div className="p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {listings.map((list) => (
        <ListingCard key={list.id} listing={list} />
      ))}
    </div>
  );
}
