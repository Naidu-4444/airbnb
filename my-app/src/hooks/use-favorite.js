import { removeFavoritebyId, setFavorite } from "@/app/actions/favorites";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function useFavorite({ user, listingId }) {
  const router = useRouter();

  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, user]);

  const toggleFavorite = useCallback(async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavoritebyId(listingId);
      } else {
        await setFavorite(listingId);
      }
      router.refresh();
    } catch (error) {
      console.log("Error toggling favorite", error);
    }
  }, [user, listingId, isFavorite, router]);

  return { toggleFavorite, isFavorite };
}
