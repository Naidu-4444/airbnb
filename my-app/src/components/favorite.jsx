import GetUser from "@/app/actions/getUser";
import useFavorite from "@/hooks/use-favorite";

function Favorite({ className = "", user, listingId }) {
  console.log(user);
  const { toggleFavorite, isFavorite } = useFavorite({ user, listingId });
  return (
    <div
      className={`p-1 rounded-full shadow-md cursor-pointer ${className}`}
      onClick={(e) => {
        console.log("clicked", user.FavoriteIds);
        e.stopPropagation();
        toggleFavorite();
      }}
    >
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 2.4 2.4"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: isFavorite ? "#F44336" : "white",
        }}
      >
        <path
          fill="currentColor"
          d="m1.85 2.15 -0.65 -0.3 -0.65 0.3V0.45c0 -0.11 0.09 -0.2 0.2 -0.2h0.9c0.11 0 0.2 0.09 0.2 0.2z"
        />
      </svg>
    </div>
  );
}

export default Favorite;
