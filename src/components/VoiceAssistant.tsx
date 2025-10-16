import { useState } from "react";
import { ChevronLeft, Mic, Volume2, Home, Calendar, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Language, getTranslation } from "../utils/translations";

interface VoiceAssistantProps {
  onNavigate?: (view: string) => void;
  language: Language;
}

export function VoiceAssistant({ onNavigate, language }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);

  const messages = [
    {
      type: "assistant",
      text: getTranslation(language, "helloHowCanIHelp"),
    },
    {
      type: "user",
      text: getTranslation(language, "whatIsMedicationSchedule"),
    },
    {
      type: "assistant",
      text: getTranslation(language, "youHaveOneDose"),
    },
  ];

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => onNavigate?.("home")}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-gray-900" style={{ fontWeight: 700 }}>{getTranslation(language, "voiceAssistant")}</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-6 space-y-4 pb-40">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <Card
                className={`max-w-[80%] p-4 ${
                  message.type === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-start gap-2">
                  <p>{message.text}</p>
                  {message.type === "assistant" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Voice Input */}
        <div className="fixed bottom-20 left-0 right-0 px-6 max-w-md mx-auto">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={toggleListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform ${
                isListening
                  ? "bg-[#154D71] scale-110 shadow-2xl"
                  : "bg-[#1C6EA4] shadow-xl"
              }`}
            >
              <div
                className={`absolute w-20 h-20 rounded-full ${
                  isListening ? "animate-ping bg-[#33A1E0] opacity-30" : ""
                }`}
              ></div>
              <div
                className={`absolute w-28 h-28 rounded-full ${
                  isListening ? "bg-[#33A1E0] opacity-20" : ""
                }`}
              ></div>
              <Mic className="w-8 h-8 text-white relative z-10" />
            </button>
            <p className="text-[#154D71]" style={{ fontWeight: 600 }}>
              {isListening ? getTranslation(language, "listening") : getTranslation(language, "tapToSpeak")}
            </p>
          </div>
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
              <span className="text-xs text-gray-600">{getTranslation(language, "home")}</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1"
              onClick={() => onNavigate?.("calendar")}
            >
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-xs text-gray-600">{getTranslation(language, "medicationAdherence")}</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1"
            >
              <Mic className="w-5 h-5 text-[#154D71]" />
              <span className="text-xs text-[#154D71]">{getTranslation(language, "voiceAssistant")}</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1"
              onClick={() => onNavigate?.("settings")}
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-xs text-gray-600">{getTranslation(language, "settings")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
