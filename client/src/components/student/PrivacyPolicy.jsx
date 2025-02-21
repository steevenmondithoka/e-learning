import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100/70 to-white py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-8">
          Privacy Policy
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed text-center mb-12">
          Last Updated: February 2025
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We collect personal information such as your name, email, and contact details when you use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use your data to improve services, process transactions, and personalize your experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your security is our priority. We implement strict security measures to protect your data from unauthorized access.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may use third-party analytics and payment services, each with its own privacy policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, or delete your information. Contact us for assistance.
            </p>
          </div>
        </section>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-800">
            Questions? Email us at{" "}
            <span className="text-cyan-600 font-medium">privacy@company.com</span>
          </p>
          <p className="text-sm text-gray-600 mt-6">
            &copy; 2025 E-Learning. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
