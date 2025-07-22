"use client";
import { useEffect, useMemo, useState } from "react";
import Calendar from "./calendar";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import GetUser from "@/app/actions/getUser";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export const formatMoney = (price) => {
  let formatter = new Intl.NumberFormat("en-IN");
  return formatter.format(price);
};

const Reservations = ({ price, listid, reservations, listingName }) => {
  const [dateRange, setdateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(price);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      setTotalPrice(days > 0 ? days * price : price);
    }
  }, [dateRange, price]);

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
    setIsLoading(true);
    const user = await GetUser();
    if (!user) {
      router.push("/sign-in");
      toast({ title: "Please sign in to make a reservation." });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listid,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          price: totalPrice,
          listingName: listingName,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        console.error("Stripe redirect error:", stripeError);
        toast({
          title: "Error",
          description: "Could not redirect to payment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Reservation error:", error);
      toast({
        title: "Something went wrong",
        description: "We couldn't process your reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-3">
      <Calendar
        value={dateRange}
        onChange={(value) => setdateRange(value.selection)}
        disabledDates={disabledDates}
      />
      <div className="flex gap-2 flex-col mt-4">
        <p className="text-lg font-semibold">
          Total Price : {formatMoney(totalPrice)}
        </p>
        <Button
          onClick={handleReservations}
          disabled={isLoading}
          className="mt-3"
        >
          {isLoading ? "Processing..." : "Reserve and Pay"}
        </Button>
      </div>
    </div>
  );
};

export default Reservations;
