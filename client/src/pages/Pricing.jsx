import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1 Page", "Messages Allowed", "No Analytics"],
    buttonText: "Get Started",
    buttonLink: "/dashboard",
  },
  {
    name: "Pro",
    price: "$21/year",
    features: ["Unlimited Pages", "Messages Allowed", "Detailed Analytics"],
    buttonText: "Upgrade Now",
    variantId: "912577",
  },
];

export default function Pricing() {
  const { auth, token } = useContext(AuthContext);
  const navigate = useNavigate();;
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!auth || !token) {
      navigate("/login");
      return
    }
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          variantId: plans[1].variantId,
          userId: auth?._id,
          email: auth?.email,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create checkout session.');
      }
      const { url } = await res.json();
      if (!url) {
        throw new Error("Checkout URL was not returned from the server.");
      }
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <main className="flex-grow px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600 mb-12">Simple pricing, no hidden fees.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`border rounded-2xl p-8 shadow-sm transition-all duration-200 ${plan.name === "Pro"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300 bg-white"
                  } flex flex-col`}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                  <p className="text-3xl font-bold text-orange-500">{plan.price}</p>
                </div>

                <ul className="text-left space-y-2 text-gray-700 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.name === "Free" ? (
                  <a
                    href={plan.buttonLink}
                    className="mt-auto bg-orange-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
                  >
                    {plan.buttonText}
                  </a>
                ) : (
                  <button
                    onClick={handleUpgrade}
                    className="mt-auto flex justify-center items-center bg-orange-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      plan.buttonText
                    )}
                  </button>

                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
