// src/pages/MissionDetails.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allMissions } from "@/data/labMissions";
import { MissionHeader } from "@/components/mission/MissionHeader";
import { MissionInterface } from "@/components/MissionInterface";
import { Button } from "@/components/ui/button";

const MissionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mission = allMissions.find((m) => m.id.toString() === id);
  const [isOpen, setIsOpen] = useState(false);

  if (!mission) {
    return (
      <div className="container mx-auto p-8">
        <h2 className="text-xl font-bold mb-4">Mission not found</h2>
        <Button onClick={() => navigate("/missions")}>Back to Missions</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
          {mission.title}
        </h1>
        <Button variant="outline" onClick={() => navigate("/missions")}>
          Back
        </Button>
      </div>

      {/* Mission Overview */}
      <MissionHeader mission={mission} />

      {/* Launch Button */}
      <div className="flex justify-center">
        <Button
          className="bg-cyber-blue hover:bg-cyber-blue/80"
          onClick={() => setIsOpen(true)}
        >
          Start Mission
        </Button>
      </div>

      {/* Mission Interface Modal */}
      <MissionInterface
        mission={mission}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default MissionDetails;
