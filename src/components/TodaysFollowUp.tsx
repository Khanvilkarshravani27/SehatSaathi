import { CheckCircle, XCircle, Clock, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Language, getTranslation } from "../utils/translations";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  times: string[];
}

interface MedicationAdherence {
  date: string;
  medicineId: string;
  status: "taken" | "missed";
}

interface TodaysFollowUpProps {
  medicines: Medicine[];
  adherenceData: MedicationAdherence[];
  language: Language;
  onNavigate: (view: string) => void;
}

export function TodaysFollowUp({ medicines, adherenceData, language, onNavigate }: TodaysFollowUpProps) {
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date();
  const currentTimeString = `${String(currentTime.getHours()).padStart(2, "0")}:${String(currentTime.getMinutes()).padStart(2, "0")}`;

  // Get all medicines scheduled for today with their status
  const todaysMedicines = medicines.flatMap((medicine) =>
    medicine.times.map((time) => {
      const adherence = adherenceData.find(
        (a) => a.date === today && a.medicineId === medicine.id
      );
      
      // Determine if the time has passed
      const timePassed = time <= currentTimeString;

      return {
        id: `${medicine.id}-${time}`,
        name: medicine.name,
        dosage: medicine.dosage,
        time: time,
        status: adherence ? adherence.status : (timePassed ? "missed" : "pending"),
        timePassed,
      };
    })
  );

  const takenCount = todaysMedicines.filter((m) => m.status === "taken").length;
  const missedCount = todaysMedicines.filter((m) => m.status === "missed").length;
  const pendingCount = todaysMedicines.filter((m) => m.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#DBE2EF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("home")}
            className="text-[#112D4E]"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-[#112D4E] text-4xl" style={{ fontWeight: 900 }}>
            {getTranslation(language, "todaysFollowUp")}
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-green-500 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-6 h-6" />
                {getTranslation(language, "taken")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl text-green-700" style={{ fontWeight: 900 }}>
                {takenCount}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-500 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="w-6 h-6" />
                {getTranslation(language, "noMissed")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl text-red-700" style={{ fontWeight: 900 }}>
                {missedCount}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Clock className="w-6 h-6" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl text-blue-700" style={{ fontWeight: 900 }}>
                {pendingCount}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Medicine List */}
        <Card className="border-2 border-[#3F72AF]">
          <CardHeader>
            <CardTitle className="text-[#112D4E] text-2xl" style={{ fontWeight: 700 }}>
              {getTranslation(language, "medicineStatus")}
            </CardTitle>
            <CardDescription className="text-base">
              All medicines scheduled for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todaysMedicines.length === 0 ? (
              <p className="text-center text-[#3F72AF] py-8">
                {getTranslation(language, "noMedicinesScheduled")}
              </p>
            ) : (
              <div className="space-y-4">
                {todaysMedicines.map((medicine) => (
                  <div
                    key={medicine.id}
                    className={`p-4 rounded-lg border-2 ${
                      medicine.status === "taken"
                        ? "bg-green-50 border-green-500"
                        : medicine.status === "missed"
                        ? "bg-red-50 border-red-500"
                        : "bg-blue-50 border-blue-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-[#112D4E] text-lg" style={{ fontWeight: 700 }}>
                          {medicine.name}
                        </h3>
                        <p className="text-[#3F72AF]">{medicine.dosage}</p>
                        <p className="text-sm text-[#3F72AF] mt-1">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {medicine.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {medicine.status === "taken" && (
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle className="w-8 h-8" />
                            <span style={{ fontWeight: 700 }}>{getTranslation(language, "taken")}</span>
                          </div>
                        )}
                        {medicine.status === "missed" && (
                          <div className="flex items-center gap-2 text-red-700">
                            <XCircle className="w-8 h-8" />
                            <span style={{ fontWeight: 700 }}>Missed</span>
                          </div>
                        )}
                        {medicine.status === "pending" && (
                          <div className="flex items-center gap-2 text-blue-700">
                            <Clock className="w-8 h-8" />
                            <span style={{ fontWeight: 700 }}>Pending</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
