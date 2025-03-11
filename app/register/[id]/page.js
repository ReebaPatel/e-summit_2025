"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  School,
  Users,
  QrCode,
  Upload,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { eventDetails } from "@/lib/eventData";
import * as tf from "@tensorflow/tfjs";
import { storage } from "@/appwrite";
import { ID } from "appwrite";
import { useForm, Controller } from "react-hook-form";
import Loader from "@/components/Loader";

export default function RegistrationForm({ params }) {
  const eventId = React.use(params).id;
  const eventQR = eventDetails[eventId].qr;
  const eventName = eventId
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      eventName: eventName,
      collegeName: "",
      course: "",
      otherCourse: "",
      businessIdea: eventId === "hack-a-business" ? "" : undefined,
      coTeamMember1: { name: "", mobile: "" },
      coTeamMember2: { name: "", mobile: "" },
      coTeamMember3: { name: "", mobile: "" },
      paymentScreenshot: "",
    },
  });

  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentVerificationResult, setPaymentVerificationResult] =
    useState("");
  const [paymentVerificationLoading, setPaymentVerificationLoading] =
    useState(false);

  const closedEvents = [
    "ipl-auction",
    "mun",
    "hack-a-business",
    "brandVision",
    "reboot-and-revive",
    "deal-and-disrupt",
  ];

  // Add this check before rendering the form
  if (closedEvents.includes(eventId)) {
    return (
      <div className="flex items-center justify-center min-h-screen mx-auto py-20 px-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-nova mb-4">Registrations Closed</h2>
          <p className="text-gray-400">
            Registration for {eventName} has officially closed. <br />
            Thank you for your interest!
          </p>
        </motion.div>
      </div>
    );
  }

  // Load TensorFlow model when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel(`/model.json`);
        setModel(loadedModel);
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
    if (!paymentScreenshot) {
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
    setLoading(true);
    try {
      // Verify payment before submission
      if (
        !paymentVerificationResult ||
        paymentVerificationResult !== "Payment Verified ✅"
      ) {
        alert("Please verify payment first!");
        return;
      }

      let fileUrl = "";

      try {
        const file = paymentScreenshot;

        // Upload the file to Appwrite Storage
        const response = await storage.createFile(
          "payments",
          ID.unique(),
          file
        );

        // Construct the file URL
        fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/payments/files/${response.$id}/view?project=e-summit-25`;
      } catch (error) {
        console.error("Error uploading file:", error);
      }

      const registrationData = {
        ...data,
        paymentScreenshot: fileUrl,
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
      setLoading(false);

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
              <p>The link to join the WhatsApp Group: ${eventDetails[eventId].whatsapp}</p>
              <p>We look forward to seeing you there!</p>
            `,
          }),
        });

        if (sendEmail.ok) {
          alert("An email has been sent to your registered Email-ID!");
        } else {
          console.error("Email sending failed!");
          alert(
            "An error occurred while sending confirmation email! Kindly contact our help desk in degree foyer."
          );
        }
      } else {
        alert("Registration Failed!");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPaymentScreenshot(file);
  };

  const courseOptions = ["B.E", "BSc", "BBA", "Other"];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
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

        <div className="mb-6 p-3 bg-gray-800 rounded-lg">
          <p className="text-white text-center">
            <strong>Note:</strong> Each team consists of a Team Leader (you) +
            up to 3 Co-Members (total 4 people)
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Team Leader Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-nova text-white mb-4 flex items-center">
              <UserCheck className="w-5 h-5 mr-2" />
              Team Leader Information
            </h3>

            <div className="flex items-center space-x-4">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Your Name (Team Leader)"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <div className="flex items-center space-x-4">
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="tel"
                placeholder="Mobile Number"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message:
                      "Please enter a valid 10-digit mobile number starting with 6-9",
                  },
                })}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}

            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Education Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <School className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="College Name"
                {...register("collegeName", {
                  required: "College name is required",
                  minLength: {
                    value: 3,
                    message: "College name must be at least 3 characters",
                  },
                })}
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            {errors.collegeName && (
              <p className="text-red-500 text-sm">
                {errors.collegeName.message}
              </p>
            )}

            <Controller
              name="course"
              control={control}
              rules={{ required: "Please select a course" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Select Course</option>
                  {courseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.course && (
              <p className="text-red-500 text-sm">{errors.course.message}</p>
            )}

            {watch("course") === "Other" && (
              <input
                type="text"
                placeholder="Specify Course"
                {...register("otherCourse", {
                  required: "Please specify your course",
                  minLength: {
                    value: 2,
                    message: "Course name must be at least 2 characters",
                  },
                })}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
              />
            )}
          </div>

          {/* Business Idea for Hack-a-Business */}
          {eventId === "hack-a-business" && (
            <div className="space-y-4">
              <textarea
                placeholder="Brief Description of Your Business Idea"
                {...register("businessIdea", {
                  required: "Business idea description is required",
                  minLength: {
                    value: 50,
                    message:
                      "Please provide a more detailed description (min 50 characters)",
                  },
                  maxLength: {
                    value: 500,
                    message: "Description should not exceed 500 characters",
                  },
                })}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                rows={4}
              />
              {errors.businessIdea && (
                <p className="text-red-500 text-sm">
                  {errors.businessIdea.message}
                </p>
              )}
            </div>
          )}

          {/* Team Members */}
          <div className="space-y-6">
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-xl font-nova text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Co-Team Members (Up to 3)
              </h3>

              <p className="text-gray-400 mb-4">
                Add details of up to 3 additional team members. With you as the
                Team Leader, your team can have a maximum of 4 people total.
              </p>

              {[1, 2, 3].map((member) => (
                <div key={member} className="space-y-4 mb-6">
                  <h4 className="text-gray-400">Co-Team Member {member}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      {...register(`coTeamMember${member}.name`, {
                        validate: (value) =>
                          !value ||
                          value.length >= 2 ||
                          "Name must be at least 2 characters",
                      })}
                      className="bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      {...register(`coTeamMember${member}.mobile`, {
                        validate: (value) =>
                          !value ||
                          /^[6-9]\d{9}$/.test(value) ||
                          "Please enter a valid 10-digit mobile number starting with 6-9",
                      })}
                      className="bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  {errors.coTeamMember1 && (
                    <p className="text-red-500 text-sm">
                      {errors.coTeamMember1.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Upload Section */}
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
                  {paymentScreenshot && (
                    <p className="text-sm text-gray-400 mt-2 truncate">
                      {paymentScreenshot.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Verification Section */}
            {paymentScreenshot && (
              <div className="mt-4">
                <div className="image-preview mb-4">
                  <img
                    id="uploaded-img"
                    src={URL.createObjectURL(paymentScreenshot)}
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
