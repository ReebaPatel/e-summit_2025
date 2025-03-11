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

// Other UI imports
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Search,
  Calendar,
  Users,
  Clock,
  MapPin,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Event details
const eventDetails = {
  "ipl-auction": {
    id: "ipl-auction",
    title: "IPL Auction",
    venue: "1st & 2nd Floor Seminar Halls",
    date: "12th March",
    time: "9:30am - 3:30pm",
    teamSize: "4 Members",
    registrationFee: "₹350",
    gradientColors: "from-orange-600 to-red-600",
  },
  "deal-and-disrupt": {
    id: "deal-and-disrupt",
    title: "Deal & Disrupt",
    venue: "1st Floor Seminar Hall",
    date: "11th March",
    time: "2pm - 4:30pm",
    teamSize: "3-4 Members",
    registrationFee: "₹200",
    gradientColors: "from-blue-600 to-purple-600",
  },
  // Add other event details here...
};

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

    const data = currentRegistrations.map((reg) => ({
      Name: reg.name,
      Email: reg.email,
      Phone: reg.mobile,
      College: reg.collegeName,
      "Team Members": [
        reg.name,
        ...(reg.coTeamMember1?.name ? [reg.coTeamMember1.name] : []),
        ...(reg.coTeamMember2?.name ? [reg.coTeamMember2.name] : []),
        ...(reg.coTeamMember3?.name ? [reg.coTeamMember3.name] : []),
      ].join("\n"), // 👈 FIX: Now team members appear on separate lines in Excel
      "Payment Screenshot": reg.paymentScreenshot || "N/A",
      "Registration Date": formatDate(reg.timestamp),
      Event: eventDetails[reg.eventId]?.title || "N/A",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");

    // Enable text wrapping in Excel
    ws["!cols"] = [
      { wch: 20 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 30 }, // College
      { wch: 40 }, // Team Members
      { wch: 20 }, // Payment Screenshot
      { wch: 25 }, // Registration Date
      { wch: 25 }, // Event
    ];

    XLSX.writeFile(wb, `registrations_${new Date().toISOString()}.xlsx`);
  };

  // Function to format date
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search registrations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={exportData} className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap">
              Export Data
            </Button>
          </div>

          {Object.entries(registrations).map(([eventId, eventRegs]) => (
            <div key={eventId} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{eventDetails[eventId]?.title} ({eventRegs.length})</h2>
              <div className="space-y-4">
                {eventRegs.map((reg) => (
                  <Card key={reg.id} className="border-l-4">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <CardTitle className="text-lg font-medium">{reg.name || "No Name"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Contact Information</p>
                      <p><strong>Email:</strong> {reg.email || "N/A"}</p>
                      <p><strong>Phone:</strong> {reg.mobile || "N/A"}</p>
                      <p><strong>College:</strong> {reg.collegeName || "N/A"}</p>
                      <p className="text-sm text-gray-500">Team Members</p>
                      <ul className="list-disc pl-5">
                        <li><strong>{reg.name || "No Name"}</strong> (Team Lead)</li>
                        {reg.coTeamMember1?.name && <li>{reg.coTeamMember1.name}</li>}
                        {reg.coTeamMember2?.name && <li>{reg.coTeamMember2.name}</li>}
                        {reg.coTeamMember3?.name && <li>{reg.coTeamMember3.name}</li>}
                      </ul>
                    </CardContent>
                  </Card>
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
