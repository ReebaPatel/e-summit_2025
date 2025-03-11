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
import * as XLSX from "xlsx";

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
    title: "Reboot & Revive",
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
    date: "17th March (Tentative)",
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

  // States for CRUD operations
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTimeout, setEditTimeout] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentRegistration, setCurrentRegistration] = useState(null);
  const [currentEventId, setCurrentEventId] = useState("");
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    collegeName: "",
    coTeamMember1: { name: "", email: "" },
    coTeamMember2: { name: "", email: "" },
    coTeamMember3: { name: "", email: "" },
  });

  const exportData = () => {
    const currentRegistrations =
      currentEvent === "all"
        ? Object.values(registrations).flat()
        : registrations[currentEvent] || [];
  
    const data = [];
  
    currentRegistrations.forEach((reg) => {
      // Create an entry for the team leader
      data.push({
        "Team Members": reg.name,
        Mobile: reg.mobile,
        RollNo: reg.rollNo || "N/A",
      });
  
      // Add the co-team members (if available)
      if (reg.coTeamMember1?.name) {
        data.push({
          "Team Members": reg.coTeamMember1.name,
          Mobile: reg.coTeamMember1.mobile || "N/A",
          RollNo: reg.coTeamMember1.rollNo || "N/A",
        });
      }
      if (reg.coTeamMember2?.name) {
        data.push({
          "Team Members": reg.coTeamMember2.name,
          Mobile: reg.coTeamMember2.mobile || "N/A",
          RollNo: reg.coTeamMember2.rollNo || "N/A",
        });
      }
      if (reg.coTeamMember3?.name) {
        data.push({
          "Team Members": reg.coTeamMember3.name,
          Mobile: reg.coTeamMember3.mobile || "N/A",
          RollNo: reg.coTeamMember3.rollNo || "N/A",
        });
      }
    });
  
    // Prepare headers for the sheet
    const headers = ["Team Members", "Mobile", "RollNo"];
  
    // Create a worksheet with the data and headers
    const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");
  
    // Write the file to download
    XLSX.writeFile(wb, `registrations_${new Date().toISOString()}.xlsx`);
  };  

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

          // Update total participants based on team members
          eventData.forEach((reg) => {
            // Count the team leader
            let memberCount = 1;

            // Count additional team members (coTeamMember1, coTeamMember2, coTeamMember3)
            if (reg.coTeamMember1 && reg.coTeamMember1.name) memberCount++;
            if (reg.coTeamMember2 && reg.coTeamMember2.name) memberCount++;
            if (reg.coTeamMember3 && reg.coTeamMember3.name) memberCount++;

            totalParticipants += memberCount;
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

  // Filter registrations based on search term and selected event
  const filteredRegistrations = Object.entries(registrations).reduce(
    (acc, [eventId, eventRegs]) => {
      if (currentEvent !== "all" && currentEvent !== eventId) {
        return acc;
      }

      const filtered = eventRegs.filter((reg) => {
        // Include team members in search
        let searchString = `${reg.name || ""} ${reg.email || ""} ${
          reg.mobile || ""
        } ${reg.collegeName || ""}`.toLowerCase();

        // Add team members to search string
        if (reg.coTeamMember1 && reg.coTeamMember1.name) {
          searchString += ` ${reg.coTeamMember1.name} ${
            reg.coTeamMember1.email || ""
          }`;
        }
        if (reg.coTeamMember2 && reg.coTeamMember2.name) {
          searchString += ` ${reg.coTeamMember2.name} ${
            reg.coTeamMember2.email || ""
          }`;
        }
        if (reg.coTeamMember3 && reg.coTeamMember3.name) {
          searchString += ` ${reg.coTeamMember3.name} ${
            reg.coTeamMember3.email || ""
          }`;
        }

        return searchString.toLowerCase().includes(searchTerm.toLowerCase());
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

  // CRUD operations
  const handleEdit = (registration, eventId) => {
    setCurrentRegistration(registration);
    setCurrentEventId(eventId);

    setEditFormData({
      name: registration.name || "",
      email: registration.email || "",
      mobile: registration.mobile || "",
      collegeName: registration.collegeName || "",
      coTeamMember1: registration.coTeamMember1 || { name: "", email: "" },
      coTeamMember2: registration.coTeamMember2 || { name: "", email: "" },
      coTeamMember3: registration.coTeamMember3 || { name: "", email: "" },
    });

    setIsEditDialogOpen(true);
  };

  const handleView = (registration, eventId) => {
    setCurrentRegistration(registration);
    setCurrentEventId(eventId);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (registration, eventId) => {
    setCurrentRegistration(registration);
    setCurrentEventId(eventId);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateRegistration = async () => {
    if (!currentRegistration || !currentEventId) return;

    try {
      const registrationRef = doc(db, currentEventId, currentRegistration.id);
      await updateDoc(registrationRef, {
        name: editFormData.name,
        email: editFormData.email,
        mobile: editFormData.mobile,
        collegeName: editFormData.collegeName,
        coTeamMember1: editFormData.coTeamMember1,
        coTeamMember2: editFormData.coTeamMember2,
        coTeamMember3: editFormData.coTeamMember3,
      });

      // Update local state
      setRegistrations((prev) => {
        const updated = { ...prev };
        const index = updated[currentEventId].findIndex(
          (r) => r.id === currentRegistration.id
        );
        if (index !== -1) {
          updated[currentEventId][index] = {
            ...updated[currentEventId][index],
            ...editFormData,
          };
        }
        return updated;
      });

      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating registration:", error);
      alert("Failed to update registration");
    }
  };

  const handleDeleteRegistration = async () => {
    if (!currentRegistration || !currentEventId) return;

    try {
      const registrationRef = doc(db, currentEventId, currentRegistration.id);
      await deleteDoc(registrationRef);

      // Update local state
      setRegistrations((prev) => {
        const updated = { ...prev };
        updated[currentEventId] = updated[currentEventId].filter(
          (r) => r.id !== currentRegistration.id
        );
        return updated;
      });

      // Update stats
      setStats((prev) => {
        let memberCount = 1; // Team leader
        if (
          currentRegistration.coTeamMember1 &&
          currentRegistration.coTeamMember1.name
        )
          memberCount++;
        if (
          currentRegistration.coTeamMember2 &&
          currentRegistration.coTeamMember2.name
        )
          memberCount++;
        if (
          currentRegistration.coTeamMember3 &&
          currentRegistration.coTeamMember3.name
        )
          memberCount++;

        const feePerTeam = parseInt(
          eventDetails[currentEventId].registrationFee.replace(/[^\d]/g, "")
        );

        return {
          totalRegistrations: prev.totalRegistrations - 1,
          registrationsByEvent: {
            ...prev.registrationsByEvent,
            [currentEventId]:
              (prev.registrationsByEvent[currentEventId] || 0) - 1,
          },
          totalParticipants: prev.totalParticipants - memberCount,
          totalRevenue: prev.totalRevenue - feePerTeam,
        };
      });

      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting registration:", error);
      alert("Failed to delete registration");
    }
  };

  // Handle form field changes
  const handleInputChange = (field, value) => {
    // Clear any existing timeout
    if (editTimeout) clearTimeout(editTimeout);

    // Set new timeout
    setEditTimeout(
      setTimeout(() => {
        setEditFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
      }, 100)
    ); // 100ms delay
  };

  const handleTeamMemberChange = (memberField, field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [memberField]: {
        ...prev[memberField],
        [field]: value,
      },
    }));
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

  // Registration card component with CRUD buttons
  const RegistrationCard = ({ registration, eventId }) => {
    const event = eventDetails[eventId];
    if (!event) return null;

    // Count team members
    const teamMembersCount =
      [
        registration.coTeamMember1?.name,
        registration.coTeamMember2?.name,
        registration.coTeamMember3?.name,
      ].filter(Boolean).length + 1; // +1 for team leader

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
              <span className="ml-2 text-sm font-normal">
                ({teamMembersCount}{" "}
                {teamMembersCount === 1 ? "member" : "members"})
              </span>
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
                <strong>Phone:</strong> {registration.mobile || "N/A"}
              </p>
              <p>
                <strong>College:</strong> {registration.collegeName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Team Members</p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>{registration.name || "No Name"}</strong> (Team Lead)
                </li>
                {registration.coTeamMember1?.name && (
                  <li>{registration.coTeamMember1.name}</li>
                )}
                {registration.coTeamMember2?.name && (
                  <li>{registration.coTeamMember2.name}</li>
                )}
                {registration.coTeamMember3?.name && (
                  <li>{registration.coTeamMember3.name}</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-0 pb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(registration, eventId)}
            className="bg-white border-gray-300 hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 mr-1 text-gray-600" /> View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(registration, eventId)}
            className="bg-white border-gray-300 hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-1 text-gray-600" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(registration, eventId)}
            className="bg-white border-gray-300 hover:bg-gray-50 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </CardFooter>
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

  // View Dialog Component
  const ViewDialog = () => {
    if (!currentRegistration || !currentEventId) return null;

    const event = eventDetails[currentEventId];

    return (
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-800">
              Registration Details - {event.title}
            </DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
              <X className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Team Leader
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-sm text-gray-600">Name</Label>
                  <p className="font-medium text-gray-800">
                    {currentRegistration.name || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Email</Label>
                  <p className="text-gray-700">
                    {currentRegistration.email || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Phone Number</Label>
                  <p className="text-gray-700">
                    {currentRegistration.mobile || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">College</Label>
                  <p className="text-gray-700">
                    {currentRegistration.collegeName || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Team Members
              </h3>
              {currentRegistration.coTeamMember1?.name ? (
                <div className="mb-4 p-2 border rounded bg-white">
                  <p className="text-gray-800">
                    <strong>Name:</strong>{" "}
                    {currentRegistration.coTeamMember1.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong>{" "}
                    {currentRegistration.coTeamMember1.mobile || "N/A"}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No first co-member</p>
              )}
              {currentRegistration.coTeamMember2?.name ? (
                <div className="mb-4 p-2 border rounded bg-white">
                  <p className="text-gray-800">
                    <strong>Name:</strong>{" "}
                    {currentRegistration.coTeamMember2.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong>{" "}
                    {currentRegistration.coTeamMember2.mobile || "N/A"}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No second co-member</p>
              )}
              {currentRegistration.coTeamMember3?.name ? (
                <div className="mb-4 p-2 border rounded bg-white">
                  <p className="text-gray-800">
                    <strong>Name:</strong>{" "}
                    {currentRegistration.coTeamMember3.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong>{" "}
                    {currentRegistration.coTeamMember3.mobile || "N/A"}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No third co-member</p>
              )}
            </div>
          </div>

          {currentRegistration.paymentScreenshot && (
            <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Payment Screenshot
              </h3>
              <div className="border rounded p-2 bg-white">
                <a
                  href={currentRegistration.paymentScreenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Payment Screenshot
                </a>
              </div>
            </div>
          )}

          <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              Registration Metadata
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-sm text-gray-600">Timestamp</Label>
                <p className="text-gray-700">
                  {formatDate(currentRegistration.timestamp)}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Registration ID</Label>
                <p className="text-sm text-gray-700">
                  {currentRegistration.id}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => handleEdit(currentRegistration, currentEventId)}
            >
              <Edit className="h-4 w-4 mr-2" /> Edit Registration
            </Button>
            <DialogClose asChild>
              <Button className="bg-gray-800 text-white hover:bg-gray-700">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Add this Edit Dialog component just above the return statement in EventDashboard component
  const EditDialog = () => {
    if (!currentRegistration) return null;

    return (
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-800">
              Edit Registration
            </DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
              <X className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Team Leader Section */}
            <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg text-gray-800">
                Team Leader Details
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-gray-600">Name</Label>
                  <Input
                    className="bg-white border-gray-300 text-gray-800"
                    defaultValue={editFormData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-gray-600">Email</Label>
                  <Input
                    type="email"
                    className="bg-white border-gray-300 text-gray-800"
                    defaultValue={editFormData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-gray-600">Phone Number</Label>
                  <Input
                    type="tel"
                    className="bg-white border-gray-300 text-gray-800"
                    defaultValue={editFormData.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label className="text-gray-600">College</Label>
                  <Input
                    className="bg-white border-gray-300 text-gray-800"
                    defaultValue={editFormData.collegeName}
                    onChange={(e) =>
                      handleInputChange("collegeName", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Team Members Section */}
            <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg text-gray-800">
                Team Members
              </h3>
              {["coTeamMember1", "coTeamMember2", "coTeamMember3"].map(
                (member, index) => (
                  <div
                    key={member}
                    className="space-y-2 border p-3 rounded bg-gray-50"
                  >
                    <h4 className="font-medium text-gray-700">
                      Member {index + 1}
                    </h4>
                    <div>
                      <Label className="text-gray-600">Name</Label>
                      <Input
                        className="bg-white border-gray-300 text-gray-800"
                        defaultValue={editFormData[member].name}
                        onChange={(e) =>
                          handleTeamMemberChange(member, "name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-gray-600">Phone</Label>
                      <Input
                        type="tel"
                        className="bg-white border-gray-300 text-gray-800"
                        defaultValue={editFormData[member].mobile}
                        onChange={(e) =>
                          handleTeamMemberChange(
                            member,
                            "mobile",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              className="bg-gray-800 text-white hover:bg-gray-700"
              onClick={handleUpdateRegistration}
            >
              Save Changes
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-gray-300 text-white hover:bg-gray-50"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Add the Delete Confirmation Dialog
  const DeleteDialog = () => (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this registration? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDeleteRegistration}
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
            <Button
              onClick={exportData}
              className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap"
            >
              Export Data
            </Button>
          </div>

          <Tabs
            value={currentEvent}
            onValueChange={setCurrentEvent}
            className="mb-6"
          >
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

          {/* Add the dialogs at the end */}
          <ViewDialog />
          <EditDialog />
          <DeleteDialog />
        </>
      )}
    </div>
  );
};

export default EventDashboard;