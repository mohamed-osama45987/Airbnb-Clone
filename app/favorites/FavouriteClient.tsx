import Container from "../components/Container";
import Heading from "../components/Heading";
import LisitingCard from "../components/listings/ListingCard";
import { safeLisiting, safeUser } from "../types";

interface FavouriteClientProps {
  listings: safeLisiting[];
  currentUser?: safeUser | null;
}

const FavouriteClient: React.FC<FavouriteClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of palces you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <LisitingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouriteClient;
