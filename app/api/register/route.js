import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const eventId =
      data.eventName?.toLowerCase().replace(/\s+/g, "-") || "unknown-event";

    // Create a reference to the specific event collection
    const eventCollectionRef = collection(db, eventId);

    // Add the registration data to the event-specific collection
    const docRef = await addDoc(eventCollectionRef, {
      ...data,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Registration Successful", id: docRef.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration Failed", details: error.message },
      { status: 400 }
    );
  }
}
