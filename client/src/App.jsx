import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import PublicPage from "./pages/PublicPage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import CreateLink from "./pages/CreateLink";
import EditLink from "./pages/EditLink";


export default function App(){
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />}/>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="/pages/:id" element={<EditPage />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/create-link" element={<CreateLink />} />
          <Route path="/links/:id" element={<EditLink />} />
          <Route path="/:slug" element={<PublicPage />} />
        </Routes>
      </Router>
  )
}