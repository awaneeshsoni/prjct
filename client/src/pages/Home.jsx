
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.jpeg"

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />

      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            One Link. Endless Possibilities.
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            Create a beautiful page to share your links, receive anonymous messages, and track everything with powerful analytics.
          </p>
          <Link
            to="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition"
          >
            Get Started For Free
          </Link>

          <div className="mt-8">
            <img
              src={logo}
              alt="Hero Visual"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12">
            Why Choose prjct.in?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Effortless Sharing
              </h3>
              <p className="text-sm text-gray-600">
                Use one clean link for all your content, products, and platforms. Perfect for creators and freelancers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Built-in Messaging
              </h3>
              <p className="text-sm text-gray-600">
                Let people reach out without exposing personal details — fully anonymous and spam-free.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Pro-Level Analytics
              </h3>
              <p className="text-sm text-gray-600">
                Understand who visits your page, which links they click — all in a beautiful dashboard. <span className="text-orange-500 font-semibold">Included in Pro.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12">Plans for Every Creator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-sm text-left">
              <h3 className="text-xl font-semibold mb-2">Free Plan</h3>
              <p className="text-gray-600 mb-4">$0/year</p>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li>• 1 Link Page</li>
                <li>• Anonymous Messages</li>
                <li>• No Analytics</li>
              </ul>
              <Link
                to="/signup"
                className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 font-semibold transition"
              >
                Start Free
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl border border-orange-500 shadow-sm text-left">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">Pro Plan</h3>
              <p className="text-gray-600 mb-4">$21/year</p>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li>• Unlimited Link Pages</li>
                <li>• Anonymous Messages</li>
                <li>• Advanced Analytics Dashboard</li>
              </ul>
              <Link
                to="/pricing"
                className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 font-semibold transition"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Your Links Deserve Better.
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Join creators, makers, and professionals using <strong>prjct.in</strong> to grow their digital presence.
          </p>
          <Link
            to="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition"
          >
            Create Your Page
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
