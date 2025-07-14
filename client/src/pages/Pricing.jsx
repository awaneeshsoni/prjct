import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const plans = [
  {
    name: "Free",
    price: "$0",
    yearly: false,
    features: [
      "1 Link Page",
      "Messages Allowed",
      "No Analytics",
    ],
    buttonText: "Get Started",
    buttonLink: "/signup",
  },
  {
    name: "Pro",
    price: "$21/year",
    yearly: true,
    features: [
      "Unlimited Link Pages",
      "Messages Allowed",
      "Detailed Analytics",
    ],
    buttonText: "Upgrade Now",
    buttonLink: "https://your-store.lemonsqueezy.com/buy/your-plan-id?embed=1", // replace this
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-20">
        <Navbar />
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 mb-12">Simple pricing, no hidden fees.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-2xl p-8 shadow-md ${
                plan.name === "Pro" ? "border-orange-500" : "border-gray-300"
              } flex flex-col justify-between`}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                <p className="text-3xl font-bold text-orange-500 mb-6">
                  {plan.price}
                </p>
                <ul className="text-left space-y-2 mb-8 text-gray-700">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {plan.name === "Free" ? (
                <a
                  href={plan.buttonLink}
                  className="mt-auto bg-orange-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  {plan.buttonText}
                </a>
              ) : (
                <a
                  href={plan.buttonLink}
                  className="lemonsqueezy-button mt-auto bg-orange-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  {plan.buttonText}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
