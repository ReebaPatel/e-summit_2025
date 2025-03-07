import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { NextResponse as res } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    // Reference to the 'registrations' collection
    const registrationsRef = collection(db, "registrations");
    // Add a new document with an auto-generated ID
    const docRef = await addDoc(registrationsRef, data);
    return res.json({ message: "Registration Successful", id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Registration Failed" }, { status: 400 });
  }
}
