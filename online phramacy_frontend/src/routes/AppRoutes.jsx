import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DrugsList from "../pages/DrugsList";
import DrugDetails from "../pages/DrugDetails";
import AddDrug from "../pages/AddDrug";
import EditDrug from "../pages/EditDrug";
import MembersList from "../pages/MembersList";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DrugsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/drug/:id" element={<DrugDetails />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/admin/add-drug" element={<ProtectedRoute role="ADMIN"><AddDrug /></ProtectedRoute>} />
        <Route path="/admin/edit-drug/:id" element={<ProtectedRoute role="ADMIN"><EditDrug /></ProtectedRoute>} />
        <Route path="/admin/members" element={<ProtectedRoute role="ADMIN"><MembersList /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
