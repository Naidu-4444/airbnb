"use client";

import { cancelReservation } from "@/app/actions/reservation";
import ListingCard from "./listingCard";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Icons } from "./icons";
import { Button } from "./ui/button";

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

  const downloadInvoice = (e) => {
    e.stopPropagation();
    const doc = new jsPDF();

    autoTable(doc, {
      startY: 20,
      head: [["Field", "Value"]],
      body: [
        ["Reservation ID", resv.id],
        ["Listing", resv.listing.title],
        ["Start Date", new Date(resv.startDate).toLocaleDateString()],
        ["End Date", new Date(resv.endDate).toLocaleDateString()],
        ["Total Price", `${resv.totalPrice}`],
      ],
      didDrawPage: (data) => {
        doc.text("Invoice", 20, 10);
      },
    });

    doc.save(`invoice-${resv.id}.pdf`);
  };

  return (
    <div className="flex flex-col shadow p-3 rounded-lg border relative border-gray-200">
      <ListingCard
        listing={resv.listing}
        key={resv.listing.id}
        onAction={cancel}
        showbutton={true}
        reservationData={resv}
      />
      <Button
        onClick={(e) => downloadInvoice(e)}
        className="mt-2 w-full bg-blue-500"
        size="sm"
      >
        <Icons.InvoiceIcon className="mr-2" />
        Download Invoice
      </Button>
    </div>
  );
}

export default Bookedcard;
