import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId: string;
}

export async function getlistings(params: IListingsParams) {
  const { userId } = params;

  let query: any = {};
  //if you get a user id use it inside the query
  if (userId) {
    query.userId = userId;
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
