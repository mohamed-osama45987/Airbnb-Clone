export { default } from "next-auth/middleware";

//  To add protected routes
export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
