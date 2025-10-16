import { Clock, Pill } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Language, getTranslation } from "../utils/translations";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  times: string[];
  frequency: string;
  pillShape?: "circle" | "capsule" | "square";
  pillColor?: string;
}

interface TodaysScheduleViewProps {
  medicines: Medicine[];
  language: Language;
}

export function TodaysScheduleView({ medicines, language }: TodaysScheduleViewProps) {
  const renderPillShape = (shape: "circle" | "capsule" | "square", color: string) => {
    if (shape === "circle") {
      return <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color }}></div>;
    } else if (shape === "capsule") {
      return <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color }}></div>;
    } else {
      return <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: color }}></div>;
    }
  };

  // Get today's medicines (all medicines for now, could be filtered by time)
  const todaysMedicines = medicines;

  return (
    <div className="space-y-6">
      <Card className="border-[#3F72AF]">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Pill className="w-8 h-8 text-[#3F72AF]" />
            {getTranslation(language, "todaysSchedule")}
          </CardTitle>
          <CardDescription className="text-lg">
            {todaysMedicines.length} medicine{todaysMedicines.length !== 1 ? "s" : ""} scheduled for today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {todaysMedicines.length === 0 ? (
            <div className="text-center py-12 text-[#3F72AF] text-lg">
              {getTranslation(language, "noMedicinesScheduled")}
            </div>
          ) : (
            todaysMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="p-6 border-2 border-[#3F72AF] rounded-lg space-y-3 bg-[#DBE2EF]/30"
              >
                <div className="flex items-start gap-4">
                  {medicine.pillShape && medicine.pillColor && (
                    <div className="mt-1">
                      {renderPillShape(medicine.pillShape, medicine.pillColor)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-[#112D4E] text-xl mb-1">{medicine.name}</h4>
                    <p className="text-[#3F72AF] text-lg mb-2">{medicine.dosage}</p>
                    <Badge variant="outline" className="border-[#3F72AF] text-[#112D4E] text-sm">
                      {medicine.frequency}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#3F72AF]/30">
                  <p className="text-[#3F72AF] flex items-center gap-2 text-base">
                    <Clock className="w-5 h-5" />
                    Scheduled Times:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {medicine.times.map((time, index) => (
                      <Badge
                        key={index}
                        className="bg-[#3F72AF] text-white hover:bg-[#112D4E] border border-[#112D4E] text-lg px-4 py-2"
                      >
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
