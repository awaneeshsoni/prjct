import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-10">Have questions or feedback? We'd love to hear from you.</p>
          <p className="text-gray-600 mb-10">Still working on the form so please mail at: avanis@prjct.in</p>

          <form className="space-y-6 text-left opacity-50">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Message</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              disabled
              className="bg-orange-500 hover:bg-orange-600 hover:cursor-none text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
