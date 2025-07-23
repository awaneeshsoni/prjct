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
          <p className="text-gray-600 text-base mb-10">
            prjct.in isn't just a link-in-bio tool. It's a philosophy - that every goal, venture, and vision deserves to be seen as a project. And that you, the person behind it all, are the greatest project you'll ever work on.
          </p>
          <div className="text-left space-y-10 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-500">Our Mission</h2>
              <p>
                We believe in the power of simplicity. prjct.in is designed to help you share your projects, work, ideas, and passions without the clutter. It's about making your work accessible and engaging.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-orange-500">Let's Build Together</h2>
              <p>
                We're just getting started. If you've got feedback, thoughts, or wild ideas - we're all ears.
                <a href="/contact" className="text-orange-500 underline hover:text-orange-600"> Contact us</a> anytime. Let's build great projects.
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
