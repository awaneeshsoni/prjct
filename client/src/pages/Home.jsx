import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-white">
      <Navbar />
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row-reverse items-center gap-12 text-center lg:text-left">
          <div className="flex-1 w-full max-w-sm">
            <div className="bg-white/20 border border-gray-200 rounded-xl p-4 shadow-md backdrop-blur-sm">
              <img
                src="https://pub-53811a87b70948d3b472a354aefe49fb.r2.dev/cut.png"
                alt="Project Card Preview"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
          <div className="flex-1 w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
              You Are the Greatest Project You'll Ever Work On.
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0">
              <strong>prjct.in</strong> is your minimalist social bio link - made for people who build.
              Share everything about a project(portfolio or yourself) in one link.
              Let others message you anonymously and you get insights about everything with simple analytics.
            </p>
            <div className="flex items-center justify-center lg:justify-start mt-6 max-w-md mx-auto lg:mx-0">
              <div className="flex w-full border border-gray-300 rounded-full overflow-hidden shadow-sm bg-white">
                <span className="px-4 py-2 text-sm text-gray-600 font-mono bg-gray-100 whitespace-nowrap">
                  prjct.in/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="yourname"
                  className="flex-1 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-center lg:justify-start">
              <button
                onClick={handleCTA}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-6 rounded-full transition"
              >
                Looks nice? Get this for yourself →
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
