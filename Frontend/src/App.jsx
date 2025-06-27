import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginCustomer from "./pages/LoginCustomer";
import RegisterCustomer from "./pages/RegisterCustomer";
import VendorDashBoard from "./pages/VendorDashBoard";
import LoginVendor from "./pages/LoginVendor";
import RegisterVendor from "./pages/RegisterVendor";
import TrackSales from "./pages/TrackSales";
import CustomerOrder from "./pages/CustomerOrder";
import CustomerTrackorder from "./pages/CustomerTrackorder";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logincustomer" element={<LoginCustomer />} />
        <Route path="/registercustomer" element={<RegisterCustomer />} />
        <Route path="/loginvendor" element={<LoginVendor />} />
        <Route path="/registervendor" element={<RegisterVendor />} />
        <Route path="/vendordashboard" element={<VendorDashBoard />} />
        <Route path="/tracksales" element={<TrackSales />} />
        <Route path="/trackorder" element={<CustomerOrder />} />
        <Route path="/customertrackorder" element={<CustomerTrackorder />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
