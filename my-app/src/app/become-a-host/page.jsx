import { getAuthSession } from "@/utils/auth";
import Link from "next/link";

const Becomehost = async () => {
  const session = await getAuthSession();
  if (!session) {
    return (
      <section className="w-full h-screen flex justify-center flex-col items-center">
        <span className="font-bold">Not Authorized </span>
        <Link href="/sign-in">
          {" "}
          <span className="underline">Sign In</span>
        </Link>
      </section>
    );
  }
  return <div>Becomehost</div>;
};
export default Becomehost;
