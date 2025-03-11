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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Search,
  Users,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from "xlsx";

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
};

const EventDashboard = () => {
  const [registrations, setRegistrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentEvent, setCurrentEvent] = useState("all");

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      setLoading(true);
      const allRegistrations = {};
      try {
        for (const eventId in eventDetails) {
          const eventCollectionRef = collection(db, eventId);
          const q = query(eventCollectionRef, orderBy("timestamp", "desc"));
          const querySnapshot = await getDocs(q);

          const eventData = [];
          querySnapshot.forEach((doc) => {
            eventData.push({ id: doc.id, ...doc.data() });
          });

          allRegistrations[eventId] = eventData;
        }

        setRegistrations(allRegistrations);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRegistrations();
  }, []);

  // Format date function
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // **Updated RegistrationCard with proper line break for Team Members**
  const RegistrationCard = ({ registration, eventId }) => {
    const event = eventDetails[eventId];
    if (!event) return null;

    return (
      <Card className="mb-4 border-l-4" style={{ borderLeftColor: event.gradientColors.split("from-")[1].split(" ")[0] }}>
        <CardHeader className={`bg-gradient-to-r ${event.gradientColors} text-white`}>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">{registration.name || "No Name"}</CardTitle>
            <span className="text-sm opacity-75">{formatDate(registration.timestamp)}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Contact Information</p>
              <p><strong>Email:</strong> {registration.email || "N/A"}</p>
              <p><strong>Phone:</strong> {registration.mobile || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Team Members</p>
              <ul className="list-disc pl-5">
                <li><strong>{registration.name || "No Name"}</strong> (Team Lead)</li>
                {registration.coTeamMember1?.name && <li>{registration.coTeamMember1.name}</li>}
                {registration.coTeamMember2?.name && <li>{registration.coTeamMember2.name}</li>}
                {registration.coTeamMember3?.name && <li>{registration.coTeamMember3.name}</li>}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-0 pb-4">
          <Button variant="outline" size="sm" className="bg-white border-gray-300 hover:bg-gray-50">
            <Eye className="h-4 w-4 mr-1 text-gray-600" /> View
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-gray-300 hover:bg-gray-50">
            <Edit className="h-4 w-4 mr-1 text-gray-600" /> Edit
          </Button>
          <Button variant="outline" size="sm" className="bg-white border-gray-300 hover:bg-gray-50 text-red-500 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </CardFooter>
      </Card>
    );
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
