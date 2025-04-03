# GoTrip Travel Booking Application

GoTrip is a modern travel booking web application built with React and Tailwind CSS, providing users with a one-stop experience for travel planning and booking.

## Features

- **Destination Browsing**: Explore popular tourist destinations, view detailed information and user reviews
- **Flight Search**: Search and compare different flight options (demo feature)
- **Booking Management**: Create, edit, and manage your travel bookings
- **Location Services**: Get your current location to simplify the booking process
- **Photo ID Upload**: Add ID photos via camera or file upload functionality
- **Offline Support**: Progressive Web App (PWA) features for offline usage
- **Responsive Design**: Great user experience on any device

## Tech Stack

- **Frontend Framework**: React
- **UI Design**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Hooks
- **Local Storage**: LocalStorage and IndexedDB (via Dexie.js)
- **Build Tool**: Vite
- **PWA Support**: Using vite-plugin-pwa

## Project Structure

```
frontend/
├── public/           # Static resources
├── src/              # Source code
│   ├── components/   # Reusable components
│   │   ├── layout/   # Layout-related components
│   ├── pages/        # Page components
│   ├── utils/        # Utility functions and services
│   ├── App.jsx       # Application entry component
│   └── main.jsx      # Application entry point
├── index.html        # HTML template
├── package.json      # Project dependencies configuration
└── vite.config.js    # Vite configuration
```

## Main Pages

- **Home**: Displays popular destinations and search functionality
- **Destination Details**: Provides detailed information, images, attractions, and reviews of the destination
- **Flight Search**: Interface for searching flights
- **Booking Form**: Form interface for creating new bookings
- **Booking Management**: View and manage existing bookings

## Local Development

### Prerequisites

- Node.js (recommended v16 or higher)
- npm (installed with Node.js)

### Installation Steps

1. Clone the repository or extract the project files
   ```
   git clone <repository-url>
   ```
   Or extract the downloaded project package

2. Enter the project directory
   ```
   cd login_system
   ```

3. Enter the frontend directory and install dependencies
   ```
   cd frontend
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Access in browser at
   ```
   http://localhost:5173/
   ```
   (Or another port as specified in the development server output)

### Building for Production

```
cd frontend
npm run build
```

The generated files will be located in the `frontend/dist` directory and can be deployed to any static file server.

## Offline Functionality

The application is implemented as a PWA, supporting the following offline features:

- Caching of main resources, making core functionality available offline
- Application installation prompt, allowing the app to be added to the home screen
- Network status monitoring, alerting users when offline and reconnected

## Data Storage

- Booking data is stored in the browser's LocalStorage
- Photos are stored in IndexedDB, managed through Dexie.js

## Security and Privacy

- Location data is only accessed when explicitly allowed by the user
- Photos and booking information are only stored on the user's local device and are not uploaded to servers
- HTTPS is used to ensure secure data transmission

## Browser Compatibility

Modern browsers such as Chrome, Firefox, Safari, or Edge in their latest versions are recommended for the best experience and feature support.

## License

[MIT License](LICENSE) 