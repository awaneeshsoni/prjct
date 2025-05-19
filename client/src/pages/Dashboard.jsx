import React from "react";
import Navbar from "../components/Navbar";
import Message from "../components/Message";
import Page from "../components/Page";
import { useState } from "react";
import { useEffect } from "react";
import linkService from "../services/linkService";
import messageService from "../services/messageService";
import pageService from "../services/pageService";
import LinkComp from "../components/Link";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [links, setLinks] = useState(null);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userLinks, userPages, userMessages] = await Promise.all([
          linkService.getLinks(),
          pageService.getPages(),
          messageService.getMessages(),
        ]);
        setMessages(userMessages?.data.messages)
        setPages(userPages?.data.pages)
        setLinks(userLinks?.data.links)
      }
      catch (error) {
        console.log("err on frontend", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-around flex-wrap ">
        <div>
          <div className="flex flex-row justify-between">
          <h4> Messages</h4>
          <a href="/messages" className="text-blue-600">See More!</a>
          </div>
          {messages?.map(message => (
            <Message 
            key={message._id}
            message = {message.message}
            page={message.page?.title || "Page Deleted"}
            createdAt={message.createdAt}
            />
          ))}
        </div>
        <div>
          <div className="flex justify-between">
          <h1>Pages</h1>
          <Link to={'/create-page'} >Create Page</Link>
          </div>
          {
            pages?.map(page => (
              <Page 
              key={page._id}
              id={page._id}
              title={page.title}
              slug={page.slug}
              />
              )
            )
          }
        </div>
        <div>
          <div className="flex justify-between">
          <h1>Links</h1>
          <Link to={'/create-link'} >Add link</Link>
          </div>
          {
            links?.map(lnk =>(
              <LinkComp 
              key={lnk._id}
              id={lnk._id}
              title={lnk.title}
              url={lnk.url}
              />)
            )
          }
        </div>
      <Footer />
      </div>
    </div>
  )
}