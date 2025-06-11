import PropertyClient from "@/components/property-comp";
import { getProperties } from "../actions/properties";

export default async function Properties() {
  const properties = await getProperties();
  if (!properties.length) {
    return (
      <Nothing title="No Properties" des="Create Now" link="/become-a-host" />
    );
  }
  return (
    <div className="p-4 md:p-8">
      <PropertyClient data={properties} />;
    </div>
  );
}
