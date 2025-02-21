import React from "react";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-100/70">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8">

        {/* Left Section - Contact Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">We’d love to hear from you! Reach out to us through any of the following methods.</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="text-cyan-600" />
              <p className="text-gray-700">+917893834064</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-cyan-600" />
              <p className="text-gray-700">contact@elearning.com</p>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-cyan-600" />
              <p className="text-gray-700">E-Learning,Ongole,Andhra Pradesh,India</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 mt-4">
            <a href="#" className="text-cyan-600 hover:text-cyan-800">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-cyan-600 hover:text-cyan-800">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-cyan-600 hover:text-cyan-800">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Right Section - Message */}
        <div className="w-full md:w-1/2 bg-cyan-100 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800">Leave a Message</h3>
          <p className="text-gray-600 mt-2">
            Looking forward to collaborating with you! Drop us an email or connect on social media.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
