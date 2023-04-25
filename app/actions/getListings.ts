import prisma from "@/app/libs/prismadb";

export async function getlistings() {
  try {
    const listings = await prisma.listings.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
