import PropertyClient from "@/components/property-comp";
import { getProperties } from "../actions/properties";
import GetUser from "../actions/getUser";
import { redirect } from "next/navigation";
import Nothing from "@/components/nothing";

export default async function Properties() {
  const user = await GetUser();
  if (!user) {
    redirect("/sign-up");
  }
  const properties = await getProperties();
  if (!properties.length) {
    return (
      <Nothing title="No Properties" des="Create Now" link="/become-a-host" />
    );
  }
  return (
    <div className="p-4 md:p-8">
      <PropertyClient data={properties} />
    </div>
  );
}
