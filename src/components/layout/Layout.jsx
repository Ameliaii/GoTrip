import React from "react";
import Navbar from "./Navbar";
import PWAInstallPrompt from "../PWAInstallPrompt";
import NetworkStatus from "../NetworkStatus";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NetworkStatus />
      <Navbar />
      <main className="w-full">{children}</main>
      <PWAInstallPrompt />
    </div>
  );
};

export default Layout;
