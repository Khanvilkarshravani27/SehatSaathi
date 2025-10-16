import { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { LanguageSelection } from "./components/LanguageSelection";
import { AuthPage } from "./components/AuthPage";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { MedicineSchedule } from "./components/MedicineSchedule";
import { EmergencyContacts } from "./components/EmergencyContacts";
import { TodaysScheduleView } from "./components/TodaysScheduleView";
import { EmergencyContactsView } from "./components/EmergencyContactsView";
import { MedicationCalendar } from "./components/MedicationCalendar";
import { VoiceAssistant } from "./components/VoiceAssistant";
import { PillSetup } from "./components/PillSetup";
import { MedicationReminderDialog } from "./components/MedicationReminderDialog";
import { AIChatbot } from "./components/AIChatbot";
import { Settings } from "./components/Settings";
import { TodaysFollowUp } from "./components/TodaysFollowUp";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { Language } from "./utils/translations";

type View = "splash" | "language" | "auth" | "home" | "schedule" | "contacts" | "calendar" | "voice" | "pillSetup" | "settings" | "followUp" | "scheduleEdit" | "contactsEdit";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  times: string[];
  frequency: string;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "medication" | "general";
  medicineId?: string;
  medicineTime?: string;
}

interface MedicationAdherence {
  date: string; // Format: YYYY-MM-DD
  medicineId: string;
  status: "taken" | "missed";
}

interface ReminderState {
  isOpen: boolean;
  medicine: Medicine | null;
  time: string;
  reminderId: string;
}

interface SnoozedReminder {
  reminderId: string;
  medicineId: string;
  snoozeUntil: Date;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>("splash");
  const [user, setUser] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [medicationAdherence, setMedicationAdherence] = useState<MedicationAdherence[]>(() => {
    // Generate sample adherence data for the past 30 days
    const sampleData: MedicationAdherence[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      
      // 85% chance of taking medicine (good adherence)
      if (Math.random() > 0.15) {
        sampleData.push({
          date: dateStr,
          medicineId: "1",
          status: "taken",
        });
      } else {
        sampleData.push({
          date: dateStr,
          medicineId: "1",
          status: "missed",
        });
      }
      
      // Different adherence for second medicine (90%)
      if (Math.random() > 0.10) {
        sampleData.push({
          date: dateStr,
          medicineId: "2",
          status: "taken",
        });
      } else {
        sampleData.push({
          date: dateStr,
          medicineId: "2",
          status: "missed",
        });
      }
    }
    
    return sampleData;
  });
  const [reminderDialog, setReminderDialog] = useState<ReminderState>({
    isOpen: false,
    medicine: null,
    time: "",
    reminderId: "",
  });
  const [snoozedReminders, setSnoozedReminders] = useState<SnoozedReminder[]>([]);
  const [dismissedReminders, setDismissedReminders] = useState<string[]>([]); // Track dismissed reminders
  const [lastCheckedDate, setLastCheckedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: "1",
      name: "Aspirin",
      dosage: "100mg",
      times: ["08:00", "20:00"],
      frequency: "twice-daily",
    },
    {
      id: "2",
      name: "Blood Pressure Med",
      dosage: "50mg",
      times: ["18:00"],
      frequency: "daily",
    },
  ]);
  const [emergencyContacts, setEmergencyContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      phone: "+1 (555) 123-4567",
      relation: "doctor",
    },
    {
      id: "2",
      name: "Jane Doe",
      phone: "+1 (555) 987-6543",
      relation: "family",
    },
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Medication Reminder",
      message: "Time to take your Aspirin (100mg)",
      time: "2 hours ago",
      read: false,
      type: "medication",
      medicineId: "1",
      medicineTime: "08:00",
    },
    {
      id: "2",
      title: "Upcoming Medication",
      message: "Blood Pressure medication due at 6:00 PM",
      time: "4 hours ago",
      read: false,
      type: "medication",
      medicineId: "2",
      medicineTime: "18:00",
    },
    {
      id: "3",
      title: "Weekly Summary",
      message: "You've taken 95% of your medications this week. Great job!",
      time: "1 day ago",
      read: true,
      type: "general",
    },
  ]);

  useEffect(() => {
    setTimeout(() => setCurrentView("language"), 3000);
  }, []);

  // Daily adherence check - mark missed medications at end of day
  useEffect(() => {
    if (!user || medicines.length === 0) return;

    const checkDailyAdherence = () => {
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      // If date changed, check yesterday's adherence
      if (today !== lastCheckedDate) {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        // Check each medicine scheduled for yesterday
        medicines.forEach((medicine) => {
          medicine.times.forEach((time) => {
            const alreadyRecorded = medicationAdherence.some(
              (record) =>
                record.date === yesterdayStr &&
                record.medicineId === medicine.id
            );

            // If not recorded as taken, mark as missed
            if (!alreadyRecorded) {
              const missedRecord: MedicationAdherence = {
                date: yesterdayStr,
                medicineId: medicine.id,
                status: "missed",
              };
              setMedicationAdherence((prev) => [...prev, missedRecord]);
            }
          });
        });

        setLastCheckedDate(today);
        // Clear dismissed reminders for the new day
        setDismissedReminders([]);
      }
    };

    // Check every hour
    const interval = setInterval(checkDailyAdherence, 3600000);
    checkDailyAdherence(); // Check immediately
    return () => clearInterval(interval);
  }, [user, medicines, medicationAdherence, lastCheckedDate]);

  // Medication reminder system
  useEffect(() => {
    if (user && medicines.length > 0) {
      const checkMedicationTime = () => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}`;
        const today = now.toISOString().split("T")[0];

        // Check snoozed reminders
        snoozedReminders.forEach((snoozed) => {
          if (now >= snoozed.snoozeUntil) {
            const medicine = medicines.find((m) => m.id === snoozed.medicineId);
            if (medicine && !reminderDialog.isOpen) {
              // Remove from snoozed list
              setSnoozedReminders((prev) =>
                prev.filter((s) => s.reminderId !== snoozed.reminderId)
              );

              // Show reminder again
              setReminderDialog({
                isOpen: true,
                medicine: medicine,
                time: currentTime,
                reminderId: snoozed.reminderId,
              });
            }
          }
        });

        medicines.forEach((medicine) => {
          medicine.times.forEach((time) => {
            if (time === currentTime) {
              const reminderId = `${today}-${medicine.id}-${time}`;

              // Check if already responded to this reminder today
              const alreadyResponded = medicationAdherence.some(
                (record) =>
                  record.date === today && record.medicineId === medicine.id
              );

              // Check if dismissed
              const wasDismissed = dismissedReminders.includes(reminderId);

              if (!alreadyResponded && !wasDismissed && !reminderDialog.isOpen) {
                // Show reminder dialog
                setReminderDialog({
                  isOpen: true,
                  medicine: medicine,
                  time: time,
                  reminderId: reminderId,
                });

                // Add notification
                const newNotification: Notification = {
                  id: Date.now().toString(),
                  title: "Medication Reminder",
                  message: `Time to take your ${medicine.name} (${medicine.dosage})`,
                  time: "Just now",
                  read: false,
                  type: "medication",
                  medicineId: medicine.id,
                  medicineTime: time,
                };
                setNotifications((prev) => [newNotification, ...prev]);
              }
            }
          });
        });
      };

      const interval = setInterval(checkMedicationTime, 60000); // Check every minute
      checkMedicationTime(); // Check immediately
      return () => clearInterval(interval);
    }
  }, [user, medicines, medicationAdherence, snoozedReminders, dismissedReminders, reminderDialog.isOpen]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    // Only go to auth if user is not logged in
    if (!user) {
      setCurrentView("auth");
    }
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentView("home");
    toast.success("Welcome back!", {
      description: "You've successfully logged in.",
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("auth");
    toast.info("Logged out successfully");
  };

  const handleSaveMedicines = (newMedicines: Medicine[]) => {
    setMedicines(newMedicines);
    toast.success("Medicine schedule saved!", {
      description: `${newMedicines.length} medicine${newMedicines.length !== 1 ? 's' : ''} in your schedule`,
    });
    setCurrentView("home");
  };

  const handleSaveContacts = (newContacts: Contact[]) => {
    setEmergencyContacts(newContacts);
    toast.success("Emergency contacts saved!", {
      description: `${newContacts.length} contact${newContacts.length !== 1 ? 's' : ''} saved`,
    });
    setCurrentView("home");
  };

  const handleMedicineTaken = () => {
    if (reminderDialog.medicine) {
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      const adherenceRecord: MedicationAdherence = {
        date: today,
        medicineId: reminderDialog.medicine.id,
        status: "taken",
      };

      setMedicationAdherence((prev) => [...prev, adherenceRecord]);
      toast.success("Great job!", {
        description: `${reminderDialog.medicine.name} marked as taken.`,
      });
      
      // Remove from snoozed if it was snoozed
      setSnoozedReminders((prev) =>
        prev.filter((s) => s.reminderId !== reminderDialog.reminderId)
      );
      
      setReminderDialog({ isOpen: false, medicine: null, time: "", reminderId: "" });
    }
  };

  const handleRemindLater = () => {
    if (reminderDialog.medicine) {
      const snoozeUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      const snoozedReminder: SnoozedReminder = {
        reminderId: reminderDialog.reminderId,
        medicineId: reminderDialog.medicine.id,
        snoozeUntil: snoozeUntil,
      };

      setSnoozedReminders((prev) => [...prev, snoozedReminder]);
      toast.info("Reminder snoozed", {
        description: "We'll remind you again in 10 minutes.",
      });
      setReminderDialog({ isOpen: false, medicine: null, time: "", reminderId: "" });
    }
  };

  const handleReminderDismiss = () => {
    if (reminderDialog.medicine) {
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      // Mark as missed
      const adherenceRecord: MedicationAdherence = {
        date: today,
        medicineId: reminderDialog.medicine.id,
        status: "missed",
      };

      setMedicationAdherence((prev) => [...prev, adherenceRecord]);
      
      // Add to dismissed list
      setDismissedReminders((prev) => [...prev, reminderDialog.reminderId]);
      
      toast.error("Reminder dismissed", {
        description: `${reminderDialog.medicine.name} marked as missed.`,
      });
      setReminderDialog({ isOpen: false, medicine: null, time: "", reminderId: "" });
    }
  };

  const handleNotificationMedicationTaken = (notificationId: string, medicineId: string) => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const medicine = medicines.find((m) => m.id === medicineId);
    if (medicine) {
      const adherenceRecord: MedicationAdherence = {
        date: today,
        medicineId: medicineId,
        status: "taken",
      };

      setMedicationAdherence((prev) => [...prev, adherenceRecord]);
      
      // Mark notification as read
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );

      toast.success("Great job!", {
        description: `${medicine.name} marked as taken.`,
      });
    }
  };

  const handleNotificationRemindLater = (notificationId: string, medicineId: string) => {
    const snoozeUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const medicine = medicines.find((m) => m.id === medicineId);

    if (medicine) {
      const notification = notifications.find((n) => n.id === notificationId);
      
      const snoozedReminder: SnoozedReminder = {
        reminderId: `notification-${notificationId}`,
        medicineId: medicineId,
        snoozeUntil: snoozeUntil,
      };

      setSnoozedReminders((prev) => [...prev, snoozedReminder]);
      
      // Mark notification as read
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );

      toast.info("Reminder snoozed", {
        description: "We'll remind you again in 10 minutes.",
      });

      // Set a timeout to show the reminder dialog after 10 minutes
      setTimeout(() => {
        if (notification?.medicineTime) {
          setReminderDialog({
            isOpen: true,
            medicine: medicine,
            time: notification.medicineTime,
            reminderId: `notification-${notificationId}`,
          });
        }
      }, 10 * 60 * 1000);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "splash":
        return <SplashScreen onComplete={() => setCurrentView("language")} />;
      case "language":
        return <LanguageSelection onSelectLanguage={handleLanguageSelect} language={selectedLanguage} />;
      case "auth":
        return <AuthPage onLogin={handleLogin} language={selectedLanguage} />;
      case "home":
        return (
          <>
            <Navbar
              user={user}
              notifications={notifications}
              onLogout={handleLogout}
              onChangeLanguage={handleLanguageSelect}
              onNavigateToSchedule={() => setCurrentView("schedule")}
              onNavigateToContacts={() => setCurrentView("contacts")}
              currentView={currentView}
              language={selectedLanguage}
              onMedicationTaken={handleNotificationMedicationTaken}
              onMedicationRemindLater={handleNotificationRemindLater}
            />
            <HomePage
              onNavigateToSchedule={() => setCurrentView("schedule")}
              onNavigateToContacts={() => setCurrentView("contacts")}
              onNavigateToCalendar={() => setCurrentView("calendar")}
              onNavigateToVoice={() => setCurrentView("voice")}
              onNavigateToPillSetup={() => setCurrentView("pillSetup")}
              onNavigateToScheduleEdit={() => setCurrentView("scheduleEdit")}
              onNavigateToContactsEdit={() => setCurrentView("contactsEdit")}
              emergencyContacts={emergencyContacts}
              language={selectedLanguage}
            />
          </>
        );
      case "schedule":
        return (
          <>
            <Navbar
              user={user}
              notifications={notifications}
              onLogout={handleLogout}
              onChangeLanguage={handleLanguageSelect}
              onNavigateToSchedule={() => setCurrentView("schedule")}
              onNavigateToContacts={() => setCurrentView("contacts")}
              currentView={currentView}
              language={selectedLanguage}
              onMedicationTaken={handleNotificationMedicationTaken}
              onMedicationRemindLater={handleNotificationRemindLater}
            />
            <div className="min-h-screen bg-[#DBE2EF] py-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                  onClick={() => setCurrentView("home")}
                  className="mb-6 text-[#112D4E] hover:text-[#3F72AF] flex items-center gap-2 text-lg"
                  style={{ fontWeight: 700 }}
                >
                  ← Back to Home
                </button>
                <TodaysScheduleView medicines={medicines} language={selectedLanguage} />
              </div>
            </div>
          </>
        );
      case "contacts":
        return (
          <>
            <Navbar
              user={user}
              notifications={notifications}
              onLogout={handleLogout}
              onChangeLanguage={handleLanguageSelect}
              onNavigateToSchedule={() => setCurrentView("schedule")}
              onNavigateToContacts={() => setCurrentView("contacts")}
              currentView={currentView}
              language={selectedLanguage}
              onMedicationTaken={handleNotificationMedicationTaken}
              onMedicationRemindLater={handleNotificationRemindLater}
            />
            <div className="min-h-screen bg-[#DBE2EF] py-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                  onClick={() => setCurrentView("home")}
                  className="mb-6 text-[#112D4E] hover:text-[#3F72AF] flex items-center gap-2 text-lg"
                  style={{ fontWeight: 700 }}
                >
                  ← Back to Home
                </button>
                <EmergencyContactsView contacts={emergencyContacts} language={selectedLanguage} />
              </div>
            </div>
          </>
        );
      case "calendar":
        return (
          <MedicationCalendar
            onNavigate={setCurrentView}
            adherenceData={medicationAdherence}
            language={selectedLanguage}
          />
        );
      case "voice":
        return <VoiceAssistant onNavigate={setCurrentView} language={selectedLanguage} />;
      case "pillSetup":
        return (
          <PillSetup
            onNavigate={setCurrentView}
            onSave={(pill) => {
              console.log("Pill saved:", pill);
              setCurrentView("home");
            }}
            language={selectedLanguage}
          />
        );
      case "settings":
        return (
          <>
            <Navbar
              user={user}
              notifications={notifications}
              onLogout={handleLogout}
              onChangeLanguage={handleLanguageSelect}
              onNavigateToSchedule={() => setCurrentView("schedule")}
              onNavigateToContacts={() => setCurrentView("contacts")}
              currentView={currentView}
              language={selectedLanguage}
            />
            <Settings
              onNavigate={setCurrentView}
              language={selectedLanguage}
              onChangeLanguage={handleLanguageSelect}
            />
          </>
        );
      case "followUp":
        return (
          <>
            <Navbar
              user={user}
              notifications={notifications}
              onLogout={handleLogout}
              onChangeLanguage={handleLanguageSelect}
              onNavigateToSchedule={() => setCurrentView("schedule")}
              onNavigateToContacts={() => setCurrentView("contacts")}
              currentView={currentView}
              language={selectedLanguage}
            />
            <TodaysFollowUp
              medicines={medicines}
              adherenceData={medicationAdherence}
              language={selectedLanguage}
              onNavigate={setCurrentView}
            />
          </>
        );
      case "scheduleEdit":
        setTimeout(() => window.scrollTo(0, 0), 0);
        return (
          <div className="min-h-screen bg-[#DBE2EF] py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setCurrentView("home")}
                className="mb-6 text-[#112D4E] hover:text-[#3F72AF] flex items-center gap-2 text-lg"
                style={{ fontWeight: 700 }}
              >
                ← Back to Home
              </button>
              <MedicineSchedule
                onSave={handleSaveMedicines}
                initialMedicines={medicines}
                language={selectedLanguage}
              />
            </div>
          </div>
        );
      case "contactsEdit":
        setTimeout(() => window.scrollTo(0, 0), 0);
        return (
          <div className="min-h-screen bg-[#DBE2EF] py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setCurrentView("home")}
                className="mb-6 text-[#112D4E] hover:text-[#3F72AF] flex items-center gap-2 text-lg"
                style={{ fontWeight: 700 }}
              >
                ← Back to Home
              </button>
              <EmergencyContacts
                onSave={handleSaveContacts}
                initialContacts={emergencyContacts}
                language={selectedLanguage}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderView()}
      <Toaster position="top-center" richColors />
      
      {/* Medication Reminder Dialog */}
      {reminderDialog.medicine && (
        <MedicationReminderDialog
          isOpen={reminderDialog.isOpen}
          medicineName={reminderDialog.medicine.name}
          dosage={reminderDialog.medicine.dosage}
          time={reminderDialog.time}
          language={selectedLanguage}
          onTaken={handleMedicineTaken}
          onRemindLater={handleRemindLater}
          onDismiss={handleReminderDismiss}
        />
      )}

      {/* AI Chatbot - Show on all pages except splash, language, and auth */}
      {user && !["splash", "language", "auth"].includes(currentView) && (
        <AIChatbot language={selectedLanguage} />
      )}
    </>
  );
}
