import { User, Listings, Reservation } from "@prisma/client";

export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type safeLisiting = Omit<Listings, "createdAt"> & {
  createdAt: string;
};

export type safeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listings"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listings: safeLisiting;
};
