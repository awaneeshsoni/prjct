import { createContext, useContext, useEffect, useState } from "react";
import linkService from "../services/linkService";

export const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchLinks = async () => {
    try {
      const res = await linkService.getLinks();
      setLinks(res.data.links);
    } catch (err) {
      console.error("Failed to fetch links:", err);
    }
  };
  
  useEffect(() => {
  if (token) fetchLinks();
  }, [token]);

  return (
    <LinkContext.Provider value={{ links, setLinks, fetchLinks }}>
      {children}
    </LinkContext.Provider>
  );
};
