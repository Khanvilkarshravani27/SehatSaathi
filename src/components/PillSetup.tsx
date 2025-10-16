import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { Language, getTranslation } from "../utils/translations";

interface PillSetupProps {
  onNavigate?: (view: string) => void;
  onSave?: (pill: any) => void;
  language: Language;
}

export function PillSetup({ onNavigate, onSave, language }: PillSetupProps) {
  const [pillName, setPillName] = useState("");
  const [selectedShape, setSelectedShape] = useState<"circle" | "capsule" | "square" | "oval" | "ellipse" | "oblong">("circle");
  const [selectedColor, setSelectedColor] = useState("#10b981");

  const shapes = [
    { type: "circle" as const, label: getTranslation(language, "circle") },
    { type: "capsule" as const, label: getTranslation(language, "capsule") },
    { type: "square" as const, label: getTranslation(language, "square") },
    { type: "oval" as const, label: getTranslation(language, "oval") },
    { type: "ellipse" as const, label: getTranslation(language, "ellipse") },
    { type: "oblong" as const, label: getTranslation(language, "oblong") },
  ];

  const colors = [
    "#10b981", // green
    "#3b82f6", // blue
    "#7dd3fc", // light blue
    "#86efac", // light green
    "#fb7185", // pink
    "#fbbf24", // yellow
    "#c084fc", // purple
    "#a5f3fc", // cyan
    "#9ca3af", // gray
    "#f87171", // red
  ];

  const handleSave = () => {
    if (!pillName) {
      toast.error(getTranslation(language, "pleaseEnterPillName"));
      return;
    }

    const pill = {
      name: pillName,
      shape: selectedShape,
      color: selectedColor,
    };

    onSave?.(pill);
    toast.success(getTranslation(language, "pillConfigurationSaved"));
    setPillName("");
  };

  const renderShape = (shape: "circle" | "capsule" | "square" | "oval" | "ellipse" | "oblong", color: string, size: "small" | "large" = "small") => {
    const sizeClass = size === "large" ? "w-32 h-32" : "w-12 h-12";
    
    if (shape === "circle") {
      return <div className={`${sizeClass} rounded-full`} style={{ backgroundColor: color }}></div>;
    } else if (shape === "capsule") {
      return <div className={`${size === "large" ? "w-32 h-16" : "w-12 h-6"} rounded-full`} style={{ backgroundColor: color }}></div>;
    } else if (shape === "square") {
      return <div className={`${sizeClass} rounded-lg`} style={{ backgroundColor: color }}></div>;
    } else if (shape === "oval") {
      return <div className={`${size === "large" ? "w-32 h-24" : "w-12 h-9"} rounded-full`} style={{ backgroundColor: color }}></div>;
    } else if (shape === "ellipse") {
      return <div className={`${size === "large" ? "w-40 h-20" : "w-14 h-7"} rounded-full`} style={{ backgroundColor: color }}></div>;
    } else if (shape === "oblong") {
      return <div className={`${size === "large" ? "w-32 h-20" : "w-12 h-8"} rounded-full`} style={{ backgroundColor: color }}></div>;
    }
    return <div className={`${sizeClass} rounded-lg`} style={{ backgroundColor: color }}></div>;
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
            <h1 className="text-gray-900" style={{ fontWeight: 700 }}>{getTranslation(language, "setupYourPill")}</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900" style={{ fontWeight: 700 }}>{getTranslation(language, "visuallyIdentify")}</CardTitle>
              <CardDescription className="text-base">
                {getTranslation(language, "chooseShapeColor")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preview */}
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex items-center justify-center h-32">
                  {renderShape(selectedShape, selectedColor, "large")}
                </div>
                <p className="text-gray-900" style={{ fontWeight: 600 }}>{pillName || getTranslation(language, "pillName")}</p>
              </div>

              {/* Pill Name */}
              <div className="space-y-2">
                <Label htmlFor="pill-name" style={{ fontWeight: 600 }}>{getTranslation(language, "pillName")}</Label>
                <Input
                  id="pill-name"
                  placeholder={getTranslation(language, "enterMedicationName")}
                  value={pillName}
                  onChange={(e) => setPillName(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Shape Selection */}
              <div className="space-y-3">
                <Label style={{ fontWeight: 600 }}>{getTranslation(language, "choosePillShape")}</Label>
                <div className="grid grid-cols-3 gap-3">
                  {shapes.map((shape) => (
                    <button
                      key={shape.type}
                      onClick={() => setSelectedShape(shape.type)}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center gap-2 transition-all relative ${
                        selectedShape === shape.type
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-center h-12">
                        {renderShape(shape.type, selectedShape === shape.type ? selectedColor : "#64748b", "small")}
                      </div>
                      {selectedShape === shape.type && (
                        <Check className="absolute top-1 right-1 w-4 h-4 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <Label style={{ fontWeight: 600 }}>{getTranslation(language, "choosePillColor")}</Label>
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-gray-900 scale-110"
                          : "border-gray-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {selectedColor === color && (
                        <Check className="w-5 h-5 text-white mx-auto drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700"
                style={{ fontWeight: 700 }}
              >
                {getTranslation(language, "savePill")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
