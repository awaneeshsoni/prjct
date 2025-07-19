import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">About prjct.in</h1>
          <p className="text-gray-600 text-lg mb-10">
            prjct.in is a simple and powerful tool that helps creators, professionals, and brands
            showcase everything they do with just one link.
          </p>

          <div className="text-left space-y-8 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-500">🌐 Our Mission</h2>
              <p>
                We believe every person deserves a beautiful and professional online identity — without
                needing to code or build a full website. prjct.in makes that possible in minutes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-500">🚀 Built for Everyone</h2>
              <p>
                Whether you're a student, freelancer, creator, or business owner, prjct.in helps you share
                your links, receive anonymous messages, and track link analytics — all from one customizable page.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-500">💡 What Makes Us Different?</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>No bloat. Just one sleek link page.</li>
                <li>Privacy-first messaging built in.</li>
                <li>Pro features that empower — not confuse.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-500">🤝 Let’s Grow Together</h2>
              <p>
                prjct.in is still evolving. We’re listening to users and shipping features fast. If you have
                ideas, suggestions, or just want to say hi — reach out on our <a href="/contact" className="text-orange-500 underline hover:text-orange-600">contact page</a>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
