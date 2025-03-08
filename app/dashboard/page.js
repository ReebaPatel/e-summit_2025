"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Calendar,
  Users,
  Clock,
  MapPin,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import the event details
const eventDetails = {
  "ipl-auction": {
    id: "ipl-auction",
    title: "IPL Auction",
    tagline: "Build Your Dream Team",
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
    tagline: "Bid, Strategize, Outplay!",
    venue: "1st Floor Seminar Hall",
    date: "11th March",
    time: "2pm - 4:30pm",
    teamSize: "3-4 Members",
    registrationFee: "₹200",
    gradientColors: "from-blue-600 to-purple-600",
  },
  "entrepreneurial-escape-room": {
    id: "entrepreneurial-escape-room",
    title: "Escape Room",
    tagline: "Crack the Code to Success!",
    venue: "Diploma Hall",
    date: "12th March",
    time: "9am - 1:30pm",
    teamSize: "4 Members",
    registrationFee: "₹300",
    gradientColors: "from-green-600 to-teal-600",
  },
  mun: {
    id: "mun",
    title: "MUN",
    tagline: "Navigating Global Diplomacy",
    venue: "Conference Hall",
    date: "12th March",
    time: "9am - 2:30pm",
    teamSize: "1 Member",
    registrationFee: "₹100",
    gradientColors: "from-yellow-600 to-amber-600",
  },
  "reboot-and-revive": {
    id: "reboot-and-revive",
    title: "Reboot Revive",
    tagline: "Revive. Rebrand. Succeed.",
    venue: "2nd Floor Seminar Hall",
    date: "11th March",
    time: "2pm - 4pm",
    teamSize: "2-4 Members",
    registrationFee: "₹150",
    gradientColors: "from-pink-600 to-rose-600",
  },
  innovex: {
    id: "innovex",
    title: "Innovex",
    tagline: "Turn Your Projects into Game-Changers!",
    venue: "Online (All Rounds)",
    date: "9th March",
    time: "Full Day Event",
    teamSize: "2-4 Members",
    registrationFee: "₹250 per team",
    gradientColors: "from-emerald-600 to-green-600",
  },
  "hack-a-business": {
    id: "hack-a-business",
    title: "Hack Business",
    tagline: "Think Innovatively. Compete Boldly. Win Brilliantly!",
    venue: "Online (Initial Submission) + Offline Rounds (Moot Court)",
    date: "11th March",
    time: "2pm - 4pm",
    teamSize: "2 Members",
    registrationFee: "₹200",
    gradientColors: "from-indigo-600 to-purple-600",
  },
  brandvision: {
    id: "brandvision",
    title: "BrandVision",
    tagline: "Redefine Digital Experiences",
    venue: "Computer lab 311, Main Building",
    date: "12th March",
    time: "11am - 1pm",
    teamSize: "1 Member",
    registrationFee: "₹50",
    gradientColors: "from-cyan-600 to-blue-600",
  },
};

const EventDashboard = () => {
  const [registrations, setRegistrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentEvent, setCurrentEvent] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    registrationsByEvent: {},
    totalParticipants: 0,
    totalRevenue: 0,
  });

  // Check screen size on component mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      // Existing code unchanged
      setLoading(true);
      const allRegistrations = {};
      let totalParticipants = 0;
      let totalRevenue = 0;
      const registrationCounts = {};

      try {
        // Fetch registrations for each event
        for (const eventId in eventDetails) {
          const eventCollectionRef = collection(db, eventId);
          const q = query(eventCollectionRef, orderBy("timestamp", "desc"));
          const querySnapshot = await getDocs(q);

          const eventData = [];
          querySnapshot.forEach((doc) => {
            eventData.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          allRegistrations[eventId] = eventData;
          registrationCounts[eventId] = eventData.length;

          // Calculate participants and revenue
          const event = eventDetails[eventId];
          const feePerTeam = parseInt(
            event.registrationFee.replace(/[^\d]/g, "")
          );

          // Update total participants based on team size
          eventData.forEach((reg) => {
            const teamSize = reg.teamMembers ? reg.teamMembers.length : 1;
            totalParticipants += teamSize;
          });

          // Update revenue
          totalRevenue += eventData.length * feePerTeam;
        }

        setRegistrations(allRegistrations);
        setStats({
          totalRegistrations: Object.values(allRegistrations).flat().length,
          registrationsByEvent: registrationCounts,
          totalParticipants,
          totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRegistrations();
  }, []);

  // All other functions remain the same
  const filteredRegistrations = Object.entries(registrations).reduce(
    (acc, [eventId, eventRegs]) => {
      if (currentEvent !== "all" && currentEvent !== eventId) {
        return acc;
      }

      const filtered = eventRegs.filter((reg) => {
        const searchString = `${reg.name || ""} ${reg.email || ""} ${
          reg.phoneNumber || ""
        } ${reg.college || ""}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
      });

      if (filtered.length > 0) {
        acc[eventId] = filtered;
      }

      return acc;
    },
    {}
  );

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Create a responsive TabsList component
  const ResponsiveTabsList = () => {
    if (isMobile) {
      return (
        <div className="mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-2 border rounded-lg">
              <span>
                {currentEvent === "all"
                  ? "All Events"
                  : eventDetails[currentEvent]?.title || "Select Event"}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem onClick={() => setCurrentEvent("all")}>
                All Events
              </DropdownMenuItem>
              {Object.entries(eventDetails).map(([eventId, event]) => (
                <DropdownMenuItem
                  key={eventId}
                  onClick={() => setCurrentEvent(eventId)}
                >
                  {event.title.split(":")[0]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    } else {
      return (
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all" className="mb-1">
            All Events
          </TabsTrigger>
          {Object.entries(eventDetails).map(([eventId, event]) => (
            <TabsTrigger
              key={eventId}
              value={eventId}
              className="mb-1 whitespace-nowrap"
            >
              {event.title.split(":")[0]}
            </TabsTrigger>
          ))}
        </TabsList>
      );
    }
  };

  // Registration breakdown by event
  const RegistrationCard = ({ registration, eventId }) => {
    const event = eventDetails[eventId];
    if (!event) return null;

    return (
      <Card
        className="mb-4 overflow-hidden border-l-4"
        style={{
          borderLeftColor: event.gradientColors.split("from-")[1].split(" ")[0],
        }}
      >
        <CardHeader
          className={`bg-gradient-to-r ${event.gradientColors} text-white`}
        >
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">
              {registration.name || "No Name"}
            </CardTitle>
            <span className="text-sm opacity-75">
              {formatDate(registration.timestamp)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Contact Information</p>
              <p>
                <strong>Email:</strong> {registration.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {registration.phoneNumber || "N/A"}
              </p>
              <p>
                <strong>College:</strong> {registration.college || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Event Information</p>
              <p>
                <strong>Event:</strong> {event.title}
              </p>
              {registration.teamMembers &&
                registration.teamMembers.length > 0 && (
                  <div>
                    <p>
                      <strong>Team Members:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      {registration.teamMembers.map((member, idx) => (
                        <li key={idx}>
                          {member.name || "No Name"}{" "}
                          {member.email ? `(${member.email})` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
            {registration.additionalInfo && (
              <div className="col-span-1 md:col-span-2">
                <p className="text-sm text-gray-500">Additional Information</p>
                <p>{registration.additionalInfo}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const StatCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Registrations</p>
              <p className="text-2xl font-bold">{stats.totalRegistrations}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Participants</p>
              <p className="text-2xl font-bold">{stats.totalParticipants}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Events</p>
              <p className="text-2xl font-bold">
                {Object.keys(eventDetails).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-amber-100 rounded-full">
              <div className="h-6 w-6 text-amber-600 flex items-center justify-center font-bold">
                ₹
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const EventBreakdown = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Registrations by Event</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(eventDetails).map(([eventId, event]) => {
            const count = stats.registrationsByEvent[eventId] || 0;
            const percentage =
              stats.totalRegistrations > 0
                ? Math.round((count / stats.totalRegistrations) * 100)
                : 0;

            return (
              <div key={eventId}>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">
                    {count} ({percentage}%)
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full bg-gradient-to-r ${event.gradientColors}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

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
          <StatCards />
          <EventBreakdown />

          <div className="mb-6">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search registrations by name, email, or phone number..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            value={currentEvent}
            onValueChange={setCurrentEvent}
            className="mb-6"
          >
            {/* Replace the existing TabsList with our responsive version */}
            <ResponsiveTabsList />

            <TabsContent value="all">
              {Object.entries(filteredRegistrations).length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-gray-500">
                      No registrations found matching your search criteria.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                Object.entries(filteredRegistrations).map(
                  ([eventId, eventRegs]) => (
                    <div key={eventId} className="mb-8">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full bg-gradient-to-r ${eventDetails[eventId]?.gradientColors} mr-2`}
                        ></div>
                        {eventDetails[eventId]?.title} ({eventRegs.length})
                      </h2>
                      <div className="space-y-4">
                        {eventRegs.map((reg) => (
                          <RegistrationCard
                            key={reg.id}
                            registration={reg}
                            eventId={eventId}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )
              )}
            </TabsContent>

            {Object.entries(eventDetails).map(([eventId, event]) => (
              <TabsContent key={eventId} value={eventId}>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${event.gradientColors}`}
                  ></div>
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Registrations</p>
                          <p className="text-2xl font-bold">
                            {stats.registrationsByEvent[eventId] || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <div className="h-6 w-6 text-amber-600 flex items-center justify-center font-bold">
                            ₹
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Registration Fee
                          </p>
                          <p className="text-2xl font-bold">
                            {event.registrationFee}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Clock className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date & Time</p>
                          <p className="text-md font-medium">
                            {event.date}, {event.time}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <MapPin className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Venue</p>
                          <p className="text-md font-medium">{event.venue}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {filteredRegistrations[eventId]?.length > 0 ? (
                  <div className="space-y-4">
                    {filteredRegistrations[eventId].map((reg) => (
                      <RegistrationCard
                        key={reg.id}
                        registration={reg}
                        eventId={eventId}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-gray-500">
                        No registrations found matching your search criteria.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
};

export default EventDashboard;
