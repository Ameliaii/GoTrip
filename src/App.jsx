import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import FlightsPage from "./pages/FlightsPage";
import DestinationDetail from "./pages/DestinationDetail";
import BookingManagement from "./pages/BookingManagement";
import BookingForm from "./pages/BookingForm";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/bookings" element={<BookingManagement />} />
          <Route path="/bookings/new" element={<BookingForm />} />
          <Route path="/bookings/edit/:id" element={<BookingForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
