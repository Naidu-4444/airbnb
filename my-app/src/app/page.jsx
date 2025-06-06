import getListing from "./actions/getListing";

export default async function Home({ searchParams }) {
  const Listings = await getListing({ searchParams });

  return <div>{JSON.stringify(Listings)}</div>;
}
