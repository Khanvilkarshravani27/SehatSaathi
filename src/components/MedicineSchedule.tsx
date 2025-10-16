import { useState } from "react";
import { Plus, Trash2, Clock, Pill, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner@2.0.3";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
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

interface MedicineScheduleProps {
  onSave: (medicines: Medicine[]) => void;
  initialMedicines?: Medicine[];
  language: Language;
}

export function MedicineSchedule({ onSave, initialMedicines = [], language }: MedicineScheduleProps) {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    time: "08:00",
    frequency: "daily",
    pillShape: "circle" as "circle" | "capsule" | "square",
    pillColor: "#79A3B1",
  });
  const [showPillSetup, setShowPillSetup] = useState(false);

  const pillShapes = [
    { type: "circle" as const, label: getTranslation(language, "circle") },
    { type: "capsule" as const, label: getTranslation(language, "capsule") },
    { type: "square" as const, label: getTranslation(language, "square") },
  ];

  const pillColors = [
    "#79A3B1", "#456268", "#D0E8F2",
    "#10b981", "#3b82f6", "#7dd3fc",
    "#fb7185", "#fbbf24", "#c084fc",
    "#f87171", "#9ca3af", "#86efac",
  ];

  const renderPillShape = (shape: "circle" | "capsule" | "square", color: string, size: "small" | "medium" = "small") => {
    const sizeClass = size === "medium" ? "w-10 h-10" : "w-8 h-8";
    
    if (shape === "circle") {
      return <div className={`${sizeClass} rounded-full`} style={{ backgroundColor: color }}></div>;
    } else if (shape === "capsule") {
      return <div className={`${sizeClass} rounded-full`} style={{ backgroundColor: color }}></div>;
    } else {
      return <div className={`${sizeClass} rounded-lg`} style={{ backgroundColor: color }}></div>;
    }
  };

  const addMedicine = () => {
    if (!newMedicine.name || !newMedicine.dosage) {
      toast.error(getTranslation(language, "pleaseEnterPillName"));
      return;
    }

    const medicine: Medicine = {
      id: Date.now().toString(),
      name: newMedicine.name,
      dosage: newMedicine.dosage,
      times: [newMedicine.time],
      frequency: newMedicine.frequency,
      pillShape: newMedicine.pillShape,
      pillColor: newMedicine.pillColor,
    };

    setMedicines([...medicines, medicine]);
    setNewMedicine({ name: "", dosage: "", time: "08:00", frequency: "daily", pillShape: "circle", pillColor: "#79A3B1" });
    setShowPillSetup(false);
    toast.success(getTranslation(language, "pillConfigurationSaved"));
  };

  const addTimeToMedicine = (medicineId: string, time: string) => {
    setMedicines(
      medicines.map((med) =>
        med.id === medicineId ? { ...med, times: [...med.times, time] } : med
      )
    );
  };

  const removeMedicine = (medicineId: string) => {
    setMedicines(medicines.filter((med) => med.id !== medicineId));
    toast.success(getTranslation(language, "deleteMedicine"));
  };

  const removeTime = (medicineId: string, timeIndex: number) => {
    setMedicines(
      medicines.map((med) =>
        med.id === medicineId
          ? { ...med, times: med.times.filter((_, i) => i !== timeIndex) }
          : med
      )
    );
  };

  const handleSave = () => {
    onSave(medicines);
    toast.success("Medicine schedule saved!");
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#1C6EA4]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-6 h-6 text-[#154D71]" />
            Add New Medicine
          </CardTitle>
          <CardDescription>
            Create your personalized medication schedule
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medicine-name">Medicine Name</Label>
              <Input
                id="medicine-name"
                placeholder="e.g., Aspirin"
                value={newMedicine.name}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                placeholder="e.g., 100mg"
                value={newMedicine.dosage}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, dosage: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newMedicine.time}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, time: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={newMedicine.frequency}
                onValueChange={(value) =>
                  setNewMedicine({ ...newMedicine, frequency: value })
                }
              >
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="twice-daily">Twice Daily</SelectItem>
                  <SelectItem value="three-times">Three Times Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="as-needed">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{getTranslation(language, "visualPillIdentification")}</Label>
              <Dialog open={showPillSetup} onOpenChange={setShowPillSetup}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-[#1C6EA4] hover:bg-[#FFF9AF]">
                    <div className="flex items-center gap-2">
                      {renderPillShape(newMedicine.pillShape, newMedicine.pillColor, "small")}
                      <span>{getTranslation(language, "setupPillAppearance")}</span>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-[#154D71]">{getTranslation(language, "visualPillSetup")}</DialogTitle>
                    <DialogDescription>
                      {getTranslation(language, "chooseShapeColor")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* Preview */}
                    <div className="flex justify-center">
                      {renderPillShape(newMedicine.pillShape, newMedicine.pillColor, "medium")}
                    </div>

                    {/* Shape Selection */}
                    <div className="space-y-3">
                      <Label>Pill Shape</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {pillShapes.map((shape) => (
                          <button
                            key={shape.type}
                            onClick={() =>
                              setNewMedicine({ ...newMedicine, pillShape: shape.type })
                            }
                            className={`p-4 border-2 rounded-lg flex items-center justify-center transition-all relative ${
                              newMedicine.pillShape === shape.type
                                ? "border-[#1C6EA4] bg-[#FFF9AF]"
                                : "border-[#33A1E0] bg-white hover:border-[#1C6EA4]"
                            }`}
                          >
                            {renderPillShape(shape.type, newMedicine.pillShape === shape.type ? newMedicine.pillColor : "#9ca3af", "small")}
                            {newMedicine.pillShape === shape.type && (
                              <Check className="absolute top-1 right-1 w-4 h-4 text-[#154D71]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Selection */}
                    <div className="space-y-3">
                      <Label>Pill Color</Label>
                      <div className="grid grid-cols-6 gap-2">
                        {pillColors.map((color) => (
                          <button
                            key={color}
                            onClick={() =>
                              setNewMedicine({ ...newMedicine, pillColor: color })
                            }
                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                              newMedicine.pillColor === color
                                ? "border-[#154D71] scale-110"
                                : "border-[#33A1E0] hover:scale-105"
                            }`}
                            style={{ backgroundColor: color }}
                          >
                            {newMedicine.pillColor === color && (
                              <Check className="w-5 h-5 text-white mx-auto drop-shadow" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowPillSetup(false)}
                      className="w-full bg-[#1C6EA4] hover:bg-[#154D71]"
                    >
                      {getTranslation(language, "savePill")}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Button onClick={addMedicine} className="w-full bg-[#1C6EA4] hover:bg-[#154D71]">
            <Plus className="w-4 h-4 mr-2" />
            {getTranslation(language, "addMedicine")}
          </Button>
        </CardContent>
      </Card>

      {medicines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{getTranslation(language, "medicineSchedulePage")}</CardTitle>
            <CardDescription>
              {medicines.length} {getTranslation(language, "medicineName")}{medicines.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {medicines.map((medicine) => (
              <div
                key={medicine.id}
                className="p-4 border border-[#33A1E0] rounded-lg space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {medicine.pillShape && medicine.pillColor && (
                      <div className="mt-1">
                        {renderPillShape(medicine.pillShape, medicine.pillColor, "small")}
                      </div>
                    )}
                    <div>
                      <h4 className="text-[#154D71]">{medicine.name}</h4>
                      <p className="text-[#1C6EA4]">{medicine.dosage}</p>
                      <Badge variant="outline" className="mt-2 border-[#1C6EA4] text-[#154D71]">
                        {medicine.frequency}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMedicine(medicine.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-[#1C6EA4] flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {getTranslation(language, "scheduleTime")}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {medicine.times.map((time, index) => (
                      <Badge
                        key={index}
                        className="bg-[#FFF9AF] text-[#154D71] hover:bg-[#33A1E0] border border-[#1C6EA4]"
                      >
                        {time}
                        <button
                          onClick={() => removeTime(medicine.id, index)}
                          className="ml-2 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={handleSave} className="w-full bg-[#1C6EA4] hover:bg-[#154D71]">
              {getTranslation(language, "saveSchedule")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
