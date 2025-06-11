"use client";

import { cancelReservation } from "@/app/actions/reservation";
import ListingCard from "./listingCard";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

function Bookedcard({ resv }) {
  const router = useRouter();
  const cancel = async () => {
    await cancelReservation(resv.id);
    router.refresh();
    toast({
      title: "Deleted",
      description: "Reservation cancelled successfully",
    });
  };
  return (
    <div>
      <ListingCard
        listing={resv.listing}
        key={resv.listing.id}
        onAction={cancel}
        showbutton={true}
        reservationData={resv}
      />
    </div>
  );
}
export default Bookedcard;
