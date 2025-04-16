"use client"; 
import { RoomCanvas } from "@/components/RoomCanvas"; // Importing the RoomCanvas component
import React from "react"; // Importing React

// This component represents a dynamic canvas page for a specific room
export default function CanvasPage({ params }: { params: Promise<{ roomId: string}> }) {
    const { roomId } = React.use(params); 
    if (!roomId) return <p>Loading...</p>; 
    return <RoomCanvas roomId={roomId} />; 
}
