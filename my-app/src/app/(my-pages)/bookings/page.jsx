import GetUser from "@/app/actions/getUser";
import { foreservations } from "@/app/actions/reservation";
import Bookedcard from "@/components/booked-card";
import Nothing from "@/components/nothing";

import { notFound } from "next/navigation";
const Bookings = async () => {
  const user = await GetUser();
  if (!user) notFound();
  const { data: reservations } = await foreservations();
  if (reservations.length == 0) {
    return <Nothing title="No Bookings" des="Book Now" />;
  }
  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-4 gap-2">
        {reservations.map((reservation, index) => {
          return <Bookedcard key={reservation.id} resv={reservation} />;
        })}
      </div>
    </div>
  );
};
export default Bookings;
