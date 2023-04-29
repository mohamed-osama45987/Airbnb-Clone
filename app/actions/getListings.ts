import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId: string;

  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export async function getlistings(params: IListingsParams) {
  const {
    userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category,
  } = params;

  let query: any = {};
  //if you get a user id use it inside the query
  if (userId) {
    query.userId = userId;
  }

  if (category) {
    query.category = category;
  }

  if (roomCount) {
    query.roomCount = {
      gte: +roomCount, // greater that or equal roomCount
    };
  }

  if (guestCount) {
    query.guestCount = {
      gte: +guestCount,
    };
  }

  if (bathroomCount) {
    query.bathroomCount = {
      gte: +bathroomCount,
    };
  }

  if (locationValue) {
    query.locationValue = locationValue;
  }

  // most complex one the NOT is to get the opposite of the query
  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            { endDate: { gte: startDate }, startDate: { lte: startDate } },
            {
              startDate: { lte: endDate },
              endDate: { lte: endDate },
            },
          ],
        },
      },
    };
  }

  try {
    const listings = await prisma.listings.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
