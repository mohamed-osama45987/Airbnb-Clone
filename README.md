# 🏠 Airbnb Clone

This is a project that aims to replicate the functionality of the popular vacation rental platform, Airbnb. It was built using NextJs, React, Node.js, and MongoDB.

## Features

- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Credential authentication
- Google authentication
- Github authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
- Favorites system
- Shareable URL filters

## Installation

To run this project locally, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Run `npm install` to install the necessary dependencies
4. Create a `.env` file in the root directory with the following variables:
   - `DATABASE_URL`: the URI for your MongoDB database
   - `NEXTAUTH_SECRET`: a secret key for NextAuth
   - `GITHUB_ID`: your github Id
   - `GITHUB_SECRET`: your github secret
   - `GOOGLE_CLIENT_ID` your google client
   - `GOOGLE_CLIENT_SECRET` your google secret
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` A cloudinary api key
5. Run `npm run dev` to start the development server

## Contributing

Contributions are always welcome! If you would like to contribute to this project, please submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/mohamed-osama45987/Airbnb-Clone/blob/main/LICENSE) file for more information.
