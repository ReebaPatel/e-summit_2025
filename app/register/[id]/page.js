"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, School, Users, QrCode, Upload } from "lucide-react";
import Image from "next/image";
import { eventDetails } from "@/lib/eventData";
import * as tf from "@tensorflow/tfjs";

export default function RegistrationForm({ params }) {
  const eventId = React.use(params).id;
  const eventQR = eventDetails[eventId].qr;
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
    paymentScreenshot: null,
  });

  const [model, setModel] = useState(null);
  const [paymentVerificationResult, setPaymentVerificationResult] =
    useState("");
  const [paymentVerificationLoading, setPaymentVerificationLoading] =
    useState(false);

  // Load TensorFlow model when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel(`/model.json`);
        setModel(loadedModel);
        // console.log("Model loaded successfully.");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    loadModel();
  }, []);

  // Preprocess image for model input
  const processImage = async (imgElement) => {
    const img = tf.browser.fromPixels(imgElement);
    const resized = tf.image.resizeBilinear(img, [224, 224]); // Resize to match model input shape
    const normalized = resized.div(tf.scalar(255)); // Normalize pixel values (0-1)
    return normalized.expandDims(0); // Add batch dimension
  };

  // Verify Payment Screenshot
  const verifyPayment = async () => {
    if (!formData.paymentScreenshot) {
      setPaymentVerificationResult("Please upload an image first.");
      return;
    }

    setPaymentVerificationLoading(true);
    try {
      if (!model) {
        throw new Error("Model not loaded. Please refresh the page.");
      }

      const imgElement = document.getElementById("uploaded-img");
      const processedImage = await processImage(imgElement);
      const predictions = model.predict(processedImage);
      const output = await predictions.data();
      const paymentVerified =
        output[0] > 0.5 ? "Payment Verified ✅" : "Payment Not Verified ❌";

      setPaymentVerificationResult(paymentVerified);
    } catch (error) {
      setPaymentVerificationResult("Error processing image.");
      console.error(error);
    }
    setPaymentVerificationLoading(false);
  };

  const onSubmit = async (data) => {
    try {
      // Verify payment before submission
      if (
        !paymentVerificationResult ||
        paymentVerificationResult !== "Payment Verified ✅"
      ) {
        alert("Please verify payment first!");
        return;
      }

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
              <p>Thank you for registering for ${eventName}.</p>
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      paymentScreenshot: file,
    }));
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

          <div className="border-t border-gray-800 py-6 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-16 md:space-y-0">
              <div className="flex items-center space-x-4 w-full md:w-1/2">
                <QrCode className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  {eventQR && (
                    <div className="w-32 h-32 bg-white p-2 rounded-lg">
                      <Image
                        src={eventQR}
                        alt="Event QR Code"
                        width={128}
                        height={128}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4 w-full md:w-1/2">
                <Upload className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block">
                    <span className="sr-only">Payment Screenshot</span>
                    <input
                      type="file"
                      required
                      name="paymentScreenshot"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-purple-50 file:text-purple-700
                      hover:file:bg-purple-100
                      bg-gray-900 border border-gray-700 rounded-lg"
                    />
                  </label>
                  {formData.paymentScreenshot && (
                    <p className="text-sm text-gray-400 mt-2 truncate">
                      {formData.paymentScreenshot.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Verification Section */}
            {formData.paymentScreenshot && (
              <div className="mt-4">
                <div className="image-preview mb-4">
                  <img
                    id="uploaded-img"
                    src={URL.createObjectURL(formData.paymentScreenshot)}
                    alt="Uploaded"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
                <button
                  type="button"
                  onClick={verifyPayment}
                  disabled={paymentVerificationLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white font-nova py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {paymentVerificationLoading
                    ? "Verifying..."
                    : "Verify Payment"}
                </button>
                {paymentVerificationResult && (
                  <p
                    className={`mt-2 text-center ${
                      paymentVerificationResult.includes("Verified")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {paymentVerificationResult}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-nova py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Register for {eventName}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
