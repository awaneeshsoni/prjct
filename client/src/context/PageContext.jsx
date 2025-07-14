// src/context/PageContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import pageService from "../services/pageService";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [pages, setPages] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPages = async () => {
    try {
      const res = await pageService.getPages();
      setPages(res.data.pages);
    } catch (err) {
      console.error("Failed to fetch pages:", err);
    }
  };
  
  useEffect(() => {
    if(token) fetchPages();
  }, [token]);

  return (
    <PageContext.Provider value={{ pages, setPages, fetchPages }}>
      {children}
    </PageContext.Provider>
  );
};
