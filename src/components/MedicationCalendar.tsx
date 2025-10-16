import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Home, Calendar as CalendarIcon, Mic, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Language, getTranslation } from "../utils/translations";

interface MedicationAdherence {
  date: string;
  medicineId: string;
  status: "taken" | "missed";
}

interface MedicationCalendarProps {
  onNavigate?: (view: string) => void;
  adherenceData?: MedicationAdherence[];
  language: Language;
}

export function MedicationCalendar({ onNavigate, adherenceData = [], language }: MedicationCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Convert adherence data to calendar format
  const getAdherenceForDay = (day: number): "taken" | "missed" | null => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const records = adherenceData.filter((record) => record.date === dateStr);
    
    if (records.length === 0) return null;
    
    // If any medicine was taken, show taken; otherwise show missed
    const hasTaken = records.some((record) => record.status === "taken");
    const hasMissed = records.some((record) => record.status === "missed");
    
    if (hasTaken && !hasMissed) return "taken";
    if (hasMissed && !hasTaken) return "missed";
    // If both, prioritize showing taken
    return hasTaken ? "taken" : "missed";
  };

  const monthNames = getTranslation(language, "monthNames") as string[];
  const dayNames = getTranslation(language, "dayNames") as string[];

  const renderCalendarDays = () => {
    const days = [];
    const prevMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    // Previous month's trailing days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="aspect-square flex flex-col items-center justify-center text-gray-400 text-sm"
        >
          {prevMonthDays - i}
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getAdherenceForDay(day);
      const today = new Date();
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      
      const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isBeforeToday = dateToCheck < todayStart;

      days.push(
        <div
          key={day}
          className={`aspect-square flex flex-col items-center justify-center relative border rounded-lg hover:bg-[#FFF9AF] transition-colors p-1 ${
            isToday ? "border-[#3F72AF] border-2 bg-[#DBE2EF]" : "border-gray-100"
          }`}
        >
          <span className={`text-sm ${isToday ? "text-[#3F72AF]" : "text-[#154D71]"}`} style={{ fontWeight: isToday ? 700 : 400 }}>
            {day}
          </span>
          {/* Show tick/cross only for dates before today (not today or future) */}
          {isBeforeToday && status === "taken" && (
            <CheckCircle2 className="w-4 h-4 text-green-600 fill-green-600 absolute bottom-0.5" />
          )}
          {isBeforeToday && status === "missed" && (
            <XCircle className="w-4 h-4 text-red-500 fill-red-500 absolute bottom-0.5" />
          )}
        </div>
      );
    }

    // Next month's leading days
    const totalCells = days.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="aspect-square flex flex-col items-center justify-center text-gray-400 text-sm"
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate?.("home")}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-gray-900 text-xl" style={{ fontWeight: 700 }}>{getTranslation(language, "medicationAdherence")}</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Calendar */}
        <div className="p-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="w-5 h-5 text-[#154D71]" />
                </Button>
                <CardTitle className="text-[#154D71]">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-5 h-5 text-[#154D71]" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-[#1C6EA4] text-xs py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-[#154D71]">{getTranslation(language, "yesTaken")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-[#154D71]">{getTranslation(language, "noMissed")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Statistics */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-[#154D71]">
                {getTranslation(language, "monthlyStats")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const currentMonthData = adherenceData.filter((record) => {
                  const recordDate = new Date(record.date);
                  return (
                    recordDate.getMonth() === currentDate.getMonth() &&
                    recordDate.getFullYear() === currentDate.getFullYear()
                  );
                });

                const takenCount = currentMonthData.filter(
                  (r) => r.status === "taken"
                ).length;
                const missedCount = currentMonthData.filter(
                  (r) => r.status === "missed"
                ).length;
                const totalCount = takenCount + missedCount;
                const adherenceRate = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

                return (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#1C6EA4]">{getTranslation(language, "adherenceRate")}</span>
                      <span className="text-2xl text-[#154D71]" style={{ fontWeight: 700 }}>
                        {adherenceRate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full transition-all"
                        style={{ width: `${adherenceRate}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-gray-600">{getTranslation(language, "yesTaken")}</span>
                        </div>
                        <p className="text-2xl text-green-600 mt-1" style={{ fontWeight: 700 }}>
                          {takenCount}
                        </p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-sm text-gray-600">{getTranslation(language, "noMissed")}</span>
                        </div>
                        <p className="text-2xl text-red-500 mt-1" style={{ fontWeight: 700 }}>
                          {missedCount}
                        </p>
                      </div>
                    </div>

                    {/* Motivational Message */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-[#3F72AF] to-[#112D4E] rounded-lg text-white text-center">
                      {(() => {
                        if (adherenceRate >= 90) {
                          return (
                            <>
                              <p className="text-lg" style={{ fontWeight: 700 }}>🌟 {getTranslation(language, "excellentWork")}! 🌟</p>
                              <p className="text-sm mt-1">{getTranslation(language, "keepItUp")}</p>
                            </>
                          );
                        } else if (adherenceRate >= 70) {
                          return (
                            <>
                              <p className="text-lg" style={{ fontWeight: 700 }}>💪 {getTranslation(language, "goodJob")}!</p>
                              <p className="text-sm mt-1">{getTranslation(language, "almostThere")}</p>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <p className="text-lg" style={{ fontWeight: 700 }}>📢 {getTranslation(language, "stayConsistent")}</p>
                              <p className="text-sm mt-1">{getTranslation(language, "yourHealthMatters")}</p>
                            </>
                          );
                        }
                      })()}
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1"
              onClick={() => onNavigate?.("home")}
            >
              <Home className="w-5 h-5 text-gray-600" />
              <span className="text-xs text-gray-600">Home</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1"
            >
              <CalendarIcon className="w-5 h-5 text-[#154D71]" />
              <span className="text-xs text-[#154D71]">Calendar</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1"
              onClick={() => onNavigate?.("voice")}
            >
              <Mic className="w-5 h-5 text-gray-600" />
              <span className="text-xs text-gray-600">Voice</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1"
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-xs text-gray-600">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
