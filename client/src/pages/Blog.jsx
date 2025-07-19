import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const blogPosts = [
  {
    title: "Why You Should Have a Prjct.in Page in 2025",
    excerpt: "Link pages are the new business cards. Learn how prjct.in helps you stand out online.",
    date: "July 18, 2025",
  },
  {
    title: "How to Track Clicks with prjct.in Analytics",
    excerpt: "Understand your audience like never before with our clean and powerful Pro analytics dashboard.",
    date: "July 12, 2025",
  },
  {
    title: "Pro vs Free: What’s Right For You?",
    excerpt: "We break down the features of prjct.in Free and Pro plans so you can decide with confidence.",
    date: "July 3, 2025",
  },
];

const Blog = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog</h1>
          <p className="text-gray-600 mb-12">Tips, updates, and insights from the prjct.in team.</p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{post.date}</p>
                <p className="text-gray-700 text-sm mb-4">{post.excerpt}</p>
                <button className="text-orange-500 font-medium hover:underline">Read More</button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
