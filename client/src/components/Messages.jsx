import React, { useEffect, useState } from "react";
import messageService from "../services/messageService";
import Message from "../components/Message"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa";

export default function Messages() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchM = async () => {
            const res = await messageService.getMessages();
            if(res){
                setMessages(res.data.messages)
            }
    }
    fetchM()
},[])

async function handleDelete(id){
    const res = messageService.deleteMessage(id)
    if(res){
        alert("Message deleted succefully");
        window.location.reload();
    }


}
    return (
        <div className="flex flex-col justify-center items-center ">
            <Navbar />
            <div>
                <div className="flex flex-row justify-between">
                    <h4 className="text-2xl font-bold"> Messages</h4>
                </div>
                {messages?.map(message => (
                    <div className="flex flex-row gap-x-2" key={message._id}>
                    <Message
                        key={message._id}
                        message={message.message}
                        page={message.page?.title || "Page Deleted"}
                    />
                    <div onClick={() => handleDelete(message._id)}  className="text-red-500 py-6"><FaTrash /></div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}