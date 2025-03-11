"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import * as XLSX from "xlsx";
// (Other imports remain unchanged...)

const EventDashboard = () => {
  const [registrations, setRegistrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentEvent, setCurrentEvent] = useState("all");

  // **FIXED Excel Export Function**
  const exportData = () => {
    const currentRegistrations =
      currentEvent === "all"
        ? Object.values(registrations).flat()
        : registrations[currentEvent] || [];

    const data = currentRegistrations.map((reg) => {
      return {
        Name: reg.name,
        Email: reg.email,
        Phone: reg.mobile,
        College: reg.collegeName,
        "Team Members": [
          reg.name,
          ...(reg.coTeamMember1?.name ? [reg.coTeamMember1.name] : []),
          ...(reg.coTeamMember2?.name ? [reg.coTeamMember2.name] : []),
          ...(reg.coTeamMember3?.name ? [reg.coTeamMember3.name] : []),
        ].join("\n"), // 👈 FIX: Now team members will appear on separate lines in Excel
        "Payment Screenshot": reg.paymentScreenshot || "N/A",
        "Registration Date": formatDate(reg.timestamp),
        Event: eventDetails[reg.eventId]?.title || "N/A",
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");

    // Enable text wrapping in Excel for better formatting
    ws["!cols"] = [
      { wch: 20 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 30 }, // College
      { wch: 40 }, // Team Members (wider column for multi-line)
      { wch: 20 }, // Payment Screenshot
      { wch: 25 }, // Registration Date
      { wch: 25 }, // Event
    ];

    XLSX.writeFile(wb, `registrations_${new Date().toISOString()}.xlsx`);
  };

  // (The rest of your code remains unchanged...)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Event Registration Dashboard</h1>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4">Loading registration data...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search registrations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={exportData}
              className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
            >
              Export Data
            </Button>
          </div>

          {Object.entries(registrations).map(([eventId, eventRegs]) => (
            <div key={eventId} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{eventDetails[eventId]?.title} ({eventRegs.length})</h2>
              <div className="space-y-4">
                {eventRegs.map((reg) => (
                  <RegistrationCard key={reg.id} registration={reg} eventId={eventId} />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EventDashboard;
