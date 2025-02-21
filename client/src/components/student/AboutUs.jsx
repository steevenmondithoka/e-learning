import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-b from-cyan-100/70 ">
      {/* Hero Section */}
     

      {/* Our Mission & Vision */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">Our Mission & Vision</h2>
        <p className="text-gray-600 text-center mt-4">
          Our mission is to make high-quality education accessible to everyone, anytime, anywhere.  
          We aim to bridge the gap between learners and industry experts through interactive and engaging content.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Expert Instructors", desc: "Learn from industry professionals.", icon: "🎓" },
          { title: "Flexible Learning", desc: "Access courses anytime, anywhere.", icon: "🕒" },
          { title: "Interactive Content", desc: "Engaging quizzes, videos, and exercises.", icon: "📚" },
          { title: "Certification", desc: "Earn recognized certificates.", icon: "🏅" },
          { title: "Career Support", desc: "Get job assistance and mentorship.", icon: "💼" },
          { title: "Affordable Pricing", desc: "Quality education at the best price.", icon: "💰" },
        ].map((feature, index) => (
          <div key={index} className="bg-white shadow-md p-6 rounded-lg text-center">
            <div className="text-4xl">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mt-2">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us? */}
      <div className="bg-gray-200 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose Us?</h2>
          <p className="text-center text-gray-600 mt-4">
            We stand out with our commitment to quality, flexibility, and innovation in education.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[
              { title: "AI-Based Learning", desc: "Smart AI-powered learning recommendations." },
              { title: "Global Community", desc: "Learn with students from all over the world." },
              { title: "Live Sessions", desc: "Interact with instructors in live sessions." },
            ].map((reason, index) => (
              <div key={index} className="bg-white shadow-md p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-gray-800">{reason.title}</h3>
                <p className="text-gray-600 mt-2">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default AboutUs;
