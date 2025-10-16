import { Pill, Clock, CheckCircle, Bell } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Language, getTranslation } from "../utils/translations";

interface MedicationReminderDialogProps {
  isOpen: boolean;
  medicineName: string;
  dosage: string;
  time: string;
  language: Language;
  onTaken: () => void;
  onRemindLater: () => void;
  onDismiss: () => void;
}

export function MedicationReminderDialog({
  isOpen,
  medicineName,
  dosage,
  time,
  language,
  onTaken,
  onRemindLater,
  onDismiss,
}: MedicationReminderDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onDismiss()}>
      <DialogContent className="max-w-md mx-4 md:mx-auto bg-white border-4 border-[#3F72AF] rounded-2xl">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-20 h-20 bg-[#3F72AF] rounded-full flex items-center justify-center animate-pulse">
              <Pill className="w-10 h-10 text-white" />
            </div>
            <DialogTitle className="text-center text-[#112D4E] text-3xl" style={{ fontWeight: 900 }}>
              {getTranslation(language, "medicationReminder")}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-2">
          <div className="bg-[#DBE2EF] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3F72AF] rounded-full flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[#3F72AF] text-sm" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "medicineName")}
                </p>
                <p className="text-[#112D4E] text-2xl" style={{ fontWeight: 700 }}>
                  {medicineName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3F72AF] rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[#3F72AF] text-sm" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "dosageAndTime")}
                </p>
                <p className="text-[#112D4E] text-xl" style={{ fontWeight: 700 }}>
                  {dosage} • {time}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onTaken}
              className="w-full h-16 bg-green-600 hover:bg-green-700 text-white text-xl gap-2"
              style={{ fontWeight: 700 }}
            >
              <CheckCircle className="w-6 h-6" />
              {getTranslation(language, "taken")}
            </Button>
            <Button
              onClick={onRemindLater}
              variant="outline"
              className="w-full h-16 border-2 border-[#3F72AF] text-[#3F72AF] hover:bg-[#DBE2EF] text-xl gap-2"
              style={{ fontWeight: 700 }}
            >
              <Bell className="w-6 h-6" />
              {getTranslation(language, "remindIn10")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
