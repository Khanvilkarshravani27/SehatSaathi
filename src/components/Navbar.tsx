import { Bell, User, Heart, Globe, Mail, Phone, MapPin, Calendar, Users, Settings, CheckCircle, Clock } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Language, getTranslation } from "../utils/translations";

interface NavbarProps {
  user: any;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type?: "medication" | "general";
    medicineId?: string;
    medicineTime?: string;
  }>;
  onLogout: () => void;
  onChangeLanguage: (language: Language) => void;
  onNavigateToSchedule: () => void;
  onNavigateToContacts: () => void;
  currentView?: string;
  language: Language;
  onMedicationTaken?: (notificationId: string, medicineId: string) => void;
  onMedicationRemindLater?: (notificationId: string, medicineId: string) => void;
}

export function Navbar({ user, notifications, onLogout, onChangeLanguage, onNavigateToSchedule, onNavigateToContacts, currentView, language, onMedicationTaken, onMedicationRemindLater }: NavbarProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-[#3F72AF] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#3F72AF] rounded-full flex items-center justify-center">
              <Heart className="w-9 h-9 text-white" fill="white" />
            </div>
            <span className="text-[#112D4E] text-2xl" style={{ fontWeight: 900 }}>{getTranslation(language, "appName")}</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 ml-16">
            <button
              onClick={onNavigateToSchedule}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === "schedule"
                  ? "bg-[#3F72AF] text-white"
                  : "text-[#112D4E] hover:bg-[#DBE2EF]"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">{getTranslation(language, "todaysSchedule")}</span>
            </button>
            <button
              onClick={onNavigateToContacts}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === "contacts"
                  ? "bg-[#3F72AF] text-white"
                  : "text-[#112D4E] hover:bg-[#DBE2EF]"
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="font-semibold">{getTranslation(language, "emergencyContactsTitle")}</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selection */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#112D4E] hover:bg-[#DBE2EF]"
                >
                  <Globe className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{getTranslation(language, "selectLanguage")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onChangeLanguage("en")}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChangeLanguage("hi")}>
                  🇮🇳 हिन्दी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChangeLanguage("mr")}>
                  🇮🇳 मराठी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChangeLanguage("ur")}>
                  🇵🇰 اردو
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChangeLanguage("ta")}>
                  🇮🇳 தமிழ்
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onChangeLanguage("bn")}>
                  🇧🇩 বাংলা
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Notifications */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2 rounded-md text-[#112D4E] hover:bg-[#DBE2EF] transition-colors">
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                      {unreadCount}
                    </Badge>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-xl">{getTranslation(language, "notifications")}</SheetTitle>
                  <SheetDescription className="text-sm">
                    {unreadCount === 1 
                      ? getTranslation(language, "youHaveUnread").replace("{count}", String(unreadCount))
                      : getTranslation(language, "youHaveUnreadPlural").replace("{count}", String(unreadCount))
                    }
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-120px)] mt-4">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${
                          notification.read ? "bg-white" : "bg-[#DBE2EF] border-[#3F72AF]"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-[#112D4E]">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[#3F72AF] rounded-full"></div>
                          )}
                        </div>
                        <p className="text-[#3F72AF] text-sm mb-2">{notification.message}</p>
                        <span className="text-xs text-gray-500 block mb-3">{notification.time}</span>
                        
                        {/* Action buttons for medication notifications */}
                        {notification.type === "medication" && !notification.read && notification.medicineId && (
                          <div className="flex gap-2 mt-3">
                            <Button
                              onClick={() => onMedicationTaken?.(notification.id, notification.medicineId!)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                              size="sm"
                            >
                              <CheckCircle className="w-4 h-4" />
                              {getTranslation(language, "taken")}
                            </Button>
                            <Button
                              onClick={() => onMedicationRemindLater?.(notification.id, notification.medicineId!)}
                              variant="outline"
                              className="flex-1 border-[#3F72AF] text-[#3F72AF] hover:bg-[#DBE2EF] gap-2"
                              size="sm"
                            >
                              <Clock className="w-4 h-4" />
                              {getTranslation(language, "remindIn10")}
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>

            {/* Profile */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-14 h-14 bg-[#3F72AF] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <User className="w-7 h-7 text-white" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-[#112D4E]">{getTranslation(language, "userProfile")}</DialogTitle>
                  <DialogDescription>{getTranslation(language, "yourAccountInfo")}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-[#3F72AF] rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[#112D4E] text-xl" style={{ fontWeight: 700 }}>{user?.name || "User"}</h3>
                      <p className="text-[#3F72AF] text-base font-semibold">{getTranslation(language, "memberSince")}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 bg-[#DBE2EF] p-4 rounded-lg">
                    <div className="flex items-center gap-3 text-[#112D4E]">
                      <Mail className="w-5 h-5 text-[#3F72AF]" />
                      <div>
                        <p className="text-xs text-[#3F72AF]">{getTranslation(language, "email")}</p>
                        <p className="text-sm">{user?.email || "user@example.com"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[#112D4E]">
                      <Phone className="w-5 h-5 text-[#3F72AF]" />
                      <div>
                        <p className="text-xs text-[#3F72AF]">{getTranslation(language, "phoneNumber")}</p>
                        <p className="text-sm">{user?.phone || "+1 (555) 000-0000"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[#112D4E]">
                      <MapPin className="w-5 h-5 text-[#3F72AF]" />
                      <div>
                        <p className="text-xs text-[#3F72AF]">{getTranslation(language, "location")}</p>
                        <p className="text-sm">Mumbai, India</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#3F72AF] hover:bg-[#112D4E]">
                      {getTranslation(language, "editProfile")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onLogout}
                      className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                    >
                      {getTranslation(language, "logout")}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </nav>
  );
}
