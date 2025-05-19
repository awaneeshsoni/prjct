import React, { useEffect, useState } from "react";
import pageService from "../services/pageService";
import { useParams } from "react-router-dom";
import messageService from "../services/messageService";

export default function PublicPage() {
    const [page, setPage] = useState(null);
    const [message, setMessage] = useState("");
    const { slug } = useParams();

    useEffect(() => {
        const fetchPage = async () => {
            const res = await pageService.getPublicPage(slug);
            if (res) {
                console.log(res);
                setPage(res.data.page);
            }
        };
        fetchPage();
    }, [slug]);

    async function handleSubmit(e){
        e.preventDefault();
        const res = await messageService.addMessage({slug, message})
        if(res){
            alert("message sent successfully!")
            setMessage("")
        }
    }

    if (!page) return <p>Loading...</p>;

    return (
        <div>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            {page.links.map((link) => (
                <a key={link._id} href={link.url} className="block text-blue-500 underline">
                    {link.title}
                </a>
            ))}
            { page.allowAnonymousMessages ? <div>
                
                <form onSubmit={handleSubmit}>
                    <label>Leave an anonymous message</label>
                    <input
                        id="message"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-orange-300"
                    />
                    <button type="submit">Send</button>
                </form>
            </div> : ""}
            <p>made with ❤️ by <a href="/" className="text-orange-500 text-sm" >OnePage</a></p>
        </div>
    );
}
