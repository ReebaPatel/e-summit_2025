import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { NextResponse as res } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    await setDoc(doc(db, "registrations", data.email), { ...data });
    return res.json({ message: "Registration Successful" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Registration Failed" }, { status: 400 });
  }
}
