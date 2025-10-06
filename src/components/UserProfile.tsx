"use client";
import { LucideHelpingHand } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface User {
  email: string;
  id: string;
  name: string;
  phone: string;
  role: string;
  image?: string;
}

export default function UserProfile() {

  const {user, logout} = useAuth()
  
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      {/* Floating Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 relative">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-primary object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-primary bg-primary text-white flex items-center justify-center text-3xl font-bold shadow-md">
              {user.name.charAt(0)}
            </div>
          )}
          <h2 className="mt-3 text-xl font-semibold text-gray-800">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-4">
          <DetailRow label="Email" value={user.email} />
          <DetailRow label="Phone" value={user.phone} />
          {/* <DetailRow label="User ID" value={user.id} /> */}
        </div>

        {/* Floating Edit Button */}
        <div className="flex justify-center mt-8">
          <Link to={"https://job-three-ashen.vercel.app/contact"} className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full shadow-md hover:opacity-90 active:scale-95 transition">
            <LucideHelpingHand size={18} /> Contact Us
          </Link>
        </div>

        <button onClick={logout} className="bg-transparent border-none text-center mt-4 w-full text-red-500">Logout</button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col bg-gray-50 rounded-xl px-4 py-3 shadow-sm">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-gray-800 font-medium text-sm break-all">
        {value}
      </span>
    </div>
  );
}
