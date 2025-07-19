import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicPage from "./pages/PublicPage";

import DashboardLayout from "./components/DashboardLayout";
import Analytics from "./pages/Analytics";
import MessagesPage from "./pages/MessagesPage";
import PagesPage from "./pages/PagesPage";
import LinksPage from "./pages/LinksPage";
import EditPage from "./components/EditPage";
import CreatePage from "./components/CreatePage";
import CreateLink from "./components/CreateLink";
import EditLink from "./components/EditLink";
import Profile from "./components/Profile";
import Pricing from "./pages/Pricing";

import PrivateRoute from "./components/PrivateRoute";
import GuestRoute from "./components/GuestRoute";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import About from "./pages/About";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <MessagesPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pages"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <PagesPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/links"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <LinksPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-page"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CreatePage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-link"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CreateLink />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pages/:id"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <EditPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/links/:id"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <EditLink />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:ud"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route path="/:slug" element={<PublicPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />


      </Routes>
    </Router>
  );
}
