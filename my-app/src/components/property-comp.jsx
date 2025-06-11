"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import ListingCard from "./listingCard";
import { deletePropertyById, getProperties } from "@/app/actions/properties";

export default function PropertyClient({ data }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    const res = await deletePropertyById(id);
    if (res.ok) {
      router.refresh();
      toast({ title: "Deleted", description: res.message });
    } else {
      toast({ title: "Error", description: res.message });
    }
  };
  return (
    <div className="grid grid-cols-4 gap-2">
      {data.map((property) => (
        <ListingCard
          key={property.id}
          listing={property}
          showbutton={true}
          buttonlabel="Delete this property"
          onAction={() => handleDelete(property.id)}
        />
      ))}
    </div>
  );
}
