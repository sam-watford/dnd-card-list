'use client'

import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

import DndList from "../components/DndList";
import Card from "@/components/Card";
import PreviewCard from "@/components/PreviewCard";
import cards from "../mocks/cards";


export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <DndList items={cards} ListItem={Card} ItemPreview={PreviewCard} />
      </DndProvider>
    </div>
  );
}
