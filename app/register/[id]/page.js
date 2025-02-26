"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, School, Users, KeyRound } from "lucide-react";

export default function RegistrationForm({ params }) {
  const eventId = React.use(params).id;
  const eventName = eventId
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    eventName: eventName,
    collegeName: "",
    course: "",
    otherCourse: "",
    coTeamMember1: { name: "", mobile: "" },
    coTeamMember2: { name: "", mobile: "" },
    coTeamMember3: { name: "", mobile: "" },
    passCode: "",
  });

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Registration Successful!");
        const sendEmail = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: data.email,
            subject: "Registration Successful",
            html: `
              <h1>Registration Successful!</h1>
              <p>Thank you for registering for the event.</p>
              <p>We look forward to seeing you there!</p>
            `,
          }),
        });

        if (sendEmail.ok) {
          console.log("Email sent successfully!");
        } else {
          console.error("Email sending failed!");
        }
      } else {
        alert("Registration Failed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const courseOptions = ["B.E", "BSc", "BBA", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-nova text-white mb-6 text-center">
          Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Education Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <School className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="collegeName"
                placeholder="College Name"
                value={formData.collegeName}
                onChange={handleChange}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                required
              >
                <option value="">Select Course</option>
                {courseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {formData.course === "Other" && (
              <input
                type="text"
                name="otherCourse"
                placeholder="Specify Course"
                value={formData.otherCourse}
                onChange={handleChange}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            )}
          </div>

          {/* Team Members */}
          <div className="space-y-6">
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-xl font-nova text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Members
              </h3>

              {[1, 2, 3].map((member) => (
                <div key={member} className="space-y-4 mb-6">
                  <h4 className="text-gray-400">Co Team Member {member}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name={`coTeamMember${member}.name`}
                      placeholder="Name"
                      value={formData[`coTeamMember${member}`].name}
                      onChange={handleChange}
                      className="bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <input
                      type="tel"
                      name={`coTeamMember${member}.mobile`}
                      placeholder="Mobile Number"
                      value={formData[`coTeamMember${member}`].mobile}
                      onChange={handleChange}
                      className="bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pass Code */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex items-center space-x-4">
              <KeyRound className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="passCode"
                placeholder="Unique Pass Code"
                value={formData.passCode}
                onChange={handleChange}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-nova py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Submit Registration
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
