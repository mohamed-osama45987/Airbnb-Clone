import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getResrvations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      // to get all resrvations on a single listing
      query.listingsId = listingId;
    }

    if (userId) {
      // to get all the trips one user had done
      query.userId = userId;
    }

    if (authorId) {
      // to get how many resrvation that other users made to our listings
      query.listings = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listings: true },
      orderBy: { createdAt: "desc" },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listings: {
        ...reservation.listings,
        createdAt: reservation.listings?.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
