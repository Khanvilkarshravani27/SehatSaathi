import { ChevronLeft, Globe, Bell, Moon, Sun, Volume2, Vibrate } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Language, getTranslation } from "../utils/translations";
import { useState } from "react";

interface SettingsProps {
  onNavigate: (view: string) => void;
  language: Language;
  onChangeLanguage: (language: Language) => void;
}

export function Settings({ onNavigate, language, onChangeLanguage }: SettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const languages = [
    { code: "en" as Language, name: "English" },
    { code: "hi" as Language, name: "हिन्दी" },
    { code: "mr" as Language, name: "मराठी" },
    { code: "ur" as Language, name: "اردو" },
    { code: "ta" as Language, name: "தமிழ்" },
    { code: "bn" as Language, name: "বাংলা" },
  ];

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
            {getTranslation(language, "settings")}
          </h1>
        </div>

        {/* Language Settings */}
        <Card className="border-2 border-[#3F72AF]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3F72AF] rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-[#112D4E] text-2xl" style={{ fontWeight: 700 }}>
                  {getTranslation(language, "selectLanguage")}
                </CardTitle>
                <CardDescription className="text-base">
                  {getTranslation(language, "chooseLanguage")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  onClick={() => onChangeLanguage(lang.code)}
                  variant={language === lang.code ? "default" : "outline"}
                  className={`h-14 text-lg ${
                    language === lang.code
                      ? "bg-[#3F72AF] hover:bg-[#112D4E] text-white"
                      : "border-2 border-[#3F72AF] text-[#3F72AF] hover:bg-[#DBE2EF]"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-2 border-[#3F72AF]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3F72AF] rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-[#112D4E] text-2xl" style={{ fontWeight: 700 }}>
                  {getTranslation(language, "notificationSettings")}
                </CardTitle>
                <CardDescription className="text-base">
                  {getTranslation(language, "manageNotificationPreferences")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="notifications" className="text-[#112D4E] text-lg" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "enableNotifications")}
                </Label>
                <p className="text-sm text-[#3F72AF]">
                  {getTranslation(language, "receiveMedicationReminders")}
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="sound" className="text-[#112D4E] text-lg" style={{ fontWeight: 600 }}>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    {getTranslation(language, "soundAlerts")}
                  </div>
                </Label>
                <p className="text-sm text-[#3F72AF]">
                  {getTranslation(language, "playSoundForNotifications")}
                </p>
              </div>
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                disabled={!notificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="vibration" className="text-[#112D4E] text-lg" style={{ fontWeight: 600 }}>
                  <div className="flex items-center gap-2">
                    <Vibrate className="w-5 h-5" />
                    {getTranslation(language, "vibration")}
                  </div>
                </Label>
                <p className="text-sm text-[#3F72AF]">
                  {getTranslation(language, "vibrateOnNotifications")}
                </p>
              </div>
              <Switch
                id="vibration"
                checked={vibrationEnabled}
                onCheckedChange={setVibrationEnabled}
                disabled={!notificationsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="border-2 border-[#3F72AF]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3F72AF] rounded-full flex items-center justify-center">
                {darkMode ? <Moon className="w-6 h-6 text-white" /> : <Sun className="w-6 h-6 text-white" />}
              </div>
              <div>
                <CardTitle className="text-[#112D4E] text-2xl" style={{ fontWeight: 700 }}>
                  {getTranslation(language, "displaySettings")}
                </CardTitle>
                <CardDescription className="text-base">
                  {getTranslation(language, "customizeViewingExperience")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="darkmode" className="text-[#112D4E] text-lg" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "darkMode")}
                </Label>
                <p className="text-sm text-[#3F72AF]">
                  {getTranslation(language, "switchToDarkTheme")}
                </p>
              </div>
              <Switch
                id="darkmode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                disabled
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
