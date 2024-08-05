"use client";
import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

const Verifyemail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl pb-4">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No Token"}
      </h2>

      {verified && (
        <div className="mt-4">
          <h2>----------- Email Verified -----------</h2>
          <Link className="flex justify-center mt-2" href="/login">
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
};

export default Verifyemail;
