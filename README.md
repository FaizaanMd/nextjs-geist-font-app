# CineMax - Movie Booking System

A modern, full-featured movie booking system built with Next.js 15, TypeScript, and Tailwind CSS. CineMax provides a seamless experience for browsing movies, selecting seats, and managing reservations.

## 🎬 Features

### Movie Browsing & Booking
- **Home Page**: Featured movies showcase with modern hero section
- **Movies Listing**: Grid layout displaying all available movies with detailed information
- **Movie Details**: Comprehensive movie information including synopsis, ratings, and pricing
- **Interactive Seat Selection**: Visual cinema seating chart with real-time availability
- **Booking Flow**: Step-by-step booking process with form validation

### Reservation Management
- **Search Reservations**: Find bookings by email address
- **View All Reservations**: Admin view of all system bookings
- **Cancel Bookings**: Cancel confirmed reservations
- **Delete Reservations**: Permanently remove booking records
- **Booking Statistics**: Real-time counts of confirmed and cancelled reservations

### Technical Features
- **Responsive Design**: Works seamlessly across all device sizes
- **Form Validation**: Zod schema validation for user inputs
- **Error Handling**: Comprehensive error handling with user feedback
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, minimalist design using Tailwind CSS and shadcn/ui components

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React useState and useEffect
- **Image Optimization**: Next.js Image component

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cinemax-booking-system.git
   cd cinemax-booking-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### For Customers

1. **Browse Movies**: Visit the home page or movies section to see available films
2. **Book Tickets**: 
   - Click "Book Now" on any movie
   - Select your preferred showtime
   - Choose seats from the interactive seating chart
   - Fill in your contact details
   - Confirm your booking

3. **Manage Reservations**:
   - Go to "Book Tickets" in the navigation
   - Enter your email to find your reservations
   - Cancel or delete bookings as needed

### Demo Data

The system includes sample reservations for testing:
- **john.doe@example.com**: 1 confirmed reservation for Avatar
- **jane.smith@example.com**: 1 confirmed reservation for Top Gun

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page
│   ├── movies/            # Movies section
│   │   ├── page.tsx       # Movies listing
│   │   └── [id]/          # Dynamic movie booking pages
│   └── reservations/      # Reservation management
├── components/ui/         # Reusable UI components
│   ├── MovieCard.tsx      # Movie display card
│   ├── MovieBooking.tsx   # Main booking component
│   ├── SeatSelection.tsx  # Interactive seating chart
│   ├── BookingForm.tsx    # Customer details form
│   ├── ReservationCard.tsx # Reservation display
│   └── ReservationSearch.tsx # Search functionality
└── lib/                   # Utility functions and data
    ├── movies.ts          # Movie data and functions
    ├── reservations.ts    # Reservation management
    └── utils.ts           # Utility functions
```

## 🎨 Design Philosophy

CineMax follows a clean, modern design approach:

- **Minimalist Interface**: Focus on content without visual clutter
- **Typography-First**: Uses Google Fonts for professional appearance
- **No External Icons**: Clean design using only typography and layout
- **Card-Based Layout**: Organized information in digestible sections
- **Consistent Spacing**: Proper whitespace for better readability
- **Responsive Design**: Mobile-first approach with desktop enhancements

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for any environment-specific configurations:

```env
# Add any API keys or configuration here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customization

- **Movies Data**: Edit `src/lib/movies.ts` to add/modify movie information
- **Styling**: Customize colors and themes in `tailwind.config.js`
- **Components**: Modify UI components in `src/components/ui/`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful UI components
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** for the powerful React framework
- **Pexels** for the movie poster images used in the demo

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub.

---

**CineMax** - Experience movies like never before! 🎬✨
