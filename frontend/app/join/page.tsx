"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Backend API base URL
const HTTP_Backend = "http://localhost:8080";

export default function CreateRoom() {
  // Local state for room name input
  const [roomName, setRoomName] = useState("");

  // State for showing current status: 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState("idle");

  // Message to show to the user based on action result
  const [message, setMessage] = useState("");

  const router = useRouter();

  // Handle creating a new room
  const handleCreateRoom = async () => {
    const token = localStorage.getItem("token");

    // If user is not logged in, prompt them
    if (!token) {
      setStatus("error");
      setMessage("Please login first");
      return;
    }

    setStatus("loading");

    try {
      // Make API call to create room
      const response = await axios.post(
        `${HTTP_Backend}/room/create`,
        { name: roomName },
        { headers: { Authorization: token } }
      );

      const roomId = response.data.roomId;

      setStatus("success");
      setMessage(`Room "${roomName}" has been successfully created!`);

      // Navigate to the created room
      router.push(`/canvas/${roomId}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Something went wrong!";
      setStatus("error");
      setMessage(msg);
    }
  };

  // Handle joining an existing room
  const handleJoinRoom = async () => {
    setStatus("loading");

    try {
      // Make GET request to join room
      const response = await axios.get(`${HTTP_Backend}/room/${roomName}`);

      const roomId = response.data.roomId;

      setStatus("success");
      setMessage(`Joined room "${roomName}" successfully!`);

      // Navigate to the joined room
      router.push(`/canvas/${roomId}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Room not found!";
      setStatus("error");
      setMessage(msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-4">Create or Join a Room</h1>

      {/* Input field for room name */}
      <Input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter Room Name"
        className="w-full max-w-md"
      />

      {/* Create Room Button */}
      <Button
        onClick={handleCreateRoom}
        className="w-full max-w-md"
        disabled={status === "loading" || roomName.trim() === ""}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </>
        ) : (
          "Create Room"
        )}
      </Button>

      {/* Join Room Button */}
      <Button
        variant="secondary"
        onClick={handleJoinRoom}
        className="w-full max-w-md"
        disabled={status === "loading" || roomName.trim() === ""}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </>
        ) : (
          "Join Room"
        )}
      </Button>

      {/* Display success or error message */}
      {status !== "idle" && (
        <div
          className={`text-sm mt-2 font-medium ${
            status === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
