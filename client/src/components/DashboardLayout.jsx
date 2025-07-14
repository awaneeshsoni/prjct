import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { LinkContext } from "../context/LinkContext";
import { PageContext } from "../context/PageContext";
import { MessageContext } from "../context/MessageContext";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
    const { token, loading } = useContext(AuthContext);
    const { fetchLinks } = useContext(LinkContext);
    const { fetchPages } = useContext(PageContext);
    const { fetchMessages } = useContext(MessageContext);

    useEffect(() => {
        if (!loading && token) {
            fetchLinks();
            fetchPages();
            fetchMessages();
        }
    }, [loading, token]); // ✅ Only run when loading is false and token is available

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="px-4 py-16 md:py-10 md:pl-64 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
