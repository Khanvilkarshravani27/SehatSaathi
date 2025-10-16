import { useState } from "react";
import { AlertCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner@2.0.3";
import { Language, getTranslation } from "../utils/translations";

interface SOSButtonProps {
  emergencyContacts: Array<{ name: string; phone: string; relation: string }>;
  language: Language;
}

export function SOSButton({ emergencyContacts, language }: SOSButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pressing, setPressing] = useState(false);

  const handleSOSClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmSOS = () => {
    setPressing(true);
    setTimeout(() => {
      setPressing(false);
      const notifiedMessage = getTranslation(language, "notifiedContacts").replace(
        "{count}",
        emergencyContacts.length.toString()
      );
      toast.success(getTranslation(language, "emergencyAlertSent"), {
        description: notifiedMessage,
      });
      setShowConfirm(false);
    }, 1000);
  };

  return (
    <>
      <Button
        onClick={handleSOSClick}
        className="w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 shadow-2xl transform transition-all hover:scale-110 active:scale-95 border-4 border-white"
      >
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-white mb-1 mx-auto animate-pulse" />
          <span className="text-white">SOS</span>
        </div>
      </Button>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600 text-xl" style={{ fontWeight: 700 }}>
              <AlertCircle className="w-6 h-6" />
              {getTranslation(language, "emergencyAlert")}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-base">
                <p className="text-muted-foreground">{getTranslation(language, "notifyContacts")}</p>
                <ul className="mt-3 space-y-2">
                  {emergencyContacts.map((contact, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>
                        {contact.name} ({contact.relation}) - {contact.phone}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pressing}>{getTranslation(language, "cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSOS}
              disabled={pressing}
              className="bg-red-600 hover:bg-red-700"
            >
              {pressing ? getTranslation(language, "sending") : getTranslation(language, "sendEmergencyAlert")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
