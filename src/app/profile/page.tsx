"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const Profile = () => {
  const [data, setData] = useState("nothing");
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error("Error ", error);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Profile</h1>
      <hr />
      <p className="text-4">Profile Page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Logout
      </button>

      {/* <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Get User Details
      </button> */}
    </div>
  );
};

export default Profile;
