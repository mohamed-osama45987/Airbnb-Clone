import { User, Listings } from "@prisma/client";

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
