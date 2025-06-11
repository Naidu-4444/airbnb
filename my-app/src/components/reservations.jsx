"use client";
import { useEffect, useMemo, useState } from "react";
import Calendar from "./calendar";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Button } from "./ui/button";
import reservation from "@/app/actions/reservation";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const formatMoney = (price) => {
  let formatter = new Intl.NumberFormat("en-IN");
  return formatter.format(price);
};

const Reservations = ({ price, listid, reservations }) => {
  const [dateRange, setdateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(price);
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (days == 0) {
        setTotalPrice(price);
        return;
      }
      setTotalPrice(days * price);
    }
  }, [dateRange]);

  const disabledDates = useMemo(() => {
    let dates = [];
    reservations.forEach((r) => {
      const range = eachDayOfInterval({
        start: new Date(r.startDate),
        end: new Date(r.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  async function handleReservations() {
    try {
      const res = await reservation({
        listingId: listid,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        price: totalPrice,
      });

      if (res.ok) {
        router.push("/bookings");
        router.refresh();
        toast({
          title: "Success",
          description: "Reservation successful",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  return (
    <div className="mt-3">
      <Calendar
        value={dateRange}
        onChange={(value) => setdateRange(value.selection)}
        disabledDates={disabledDates}
      />
      <div className="flex gap-2 flex-col">
        <p className="text-sm font-semibold">
          Total Price : {formatMoney(totalPrice)}
        </p>
        <Button onClick={handleReservations} className="mt-3">
          Reserve
        </Button>
      </div>
    </div>
  );
};
export default Reservations;
