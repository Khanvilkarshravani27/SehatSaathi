import { Calendar, Phone, Video, Pill, Mic, CheckSquare, Languages } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { SOSButton } from "./SOSButton";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AIChatbot } from "./AIChatbot";
import { Footer } from "./Footer";
import { Language, getTranslation } from "../utils/translations";

interface HomePageProps {
  onNavigateToSchedule: () => void;
  onNavigateToContacts: () => void;
  onNavigateToCalendar: () => void;
  onNavigateToVoice: () => void;
  onNavigateToPillSetup: () => void;
  onNavigateToScheduleEdit: () => void;
  onNavigateToContactsEdit: () => void;
  emergencyContacts: Array<{ name: string; phone: string; relation: string }>;
  language: Language;
}

export function HomePage({
  onNavigateToSchedule,
  onNavigateToContacts,
  onNavigateToCalendar,
  onNavigateToVoice,
  onNavigateToPillSetup,
  onNavigateToScheduleEdit,
  onNavigateToContactsEdit,
  emergencyContacts,
  language,
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#DBE2EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-[#112D4E] text-5xl" style={{ fontWeight: 900 }}>
              {getTranslation(language, "yourPersonalHealth")}
            </h1>
            <p className="text-[#3F72AF] text-lg">
              {getTranslation(language, "neverMiss")}
            </p>
            
            <div className="flex items-center gap-6 p-6 bg-red-50 rounded-2xl border-2 border-red-200 shadow-lg">
              <SOSButton emergencyContacts={emergencyContacts} language={language} />
              <div className="space-y-2">
                <p className="text-[#112D4E]" style={{ fontWeight: 700 }}>{getTranslation(language, "emergencyHelp")}</p>
                <p className="text-[#3F72AF] text-sm">
                  {getTranslation(language, "pressSOS")}
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBlbGRlcmx5JTIwcGF0aWVudCUyMGNhcmV8ZW58MXx8fHwxNzYwNjExMzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Doctor with elderly patient"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-6">
          <h2 className="text-[#112D4E] text-center text-4xl" style={{ fontWeight: 900 }}>{getTranslation(language, "quickActions")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="border-2 border-[#3F72AF] hover:border-[#112D4E] transition-all cursor-pointer hover:shadow-lg bg-white"
              onClick={onNavigateToScheduleEdit}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-[#3F72AF] rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-[#112D4E] text-xl" style={{ fontWeight: 700 }}>{getTranslation(language, "createMedicineSchedule")}</CardTitle>
                <CardDescription className="text-base" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "setupDaily")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#3F72AF] hover:bg-[#112D4E] text-base py-5">
                  {getTranslation(language, "setUpSchedule")}
                </Button>
              </CardContent>
            </Card>

            <Card
              className="border-2 border-[#3F72AF] hover:border-[#112D4E] transition-all cursor-pointer hover:shadow-lg bg-white"
              onClick={onNavigateToContactsEdit}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-[#3F72AF] rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-[#112D4E] text-xl" style={{ fontWeight: 700 }}>{getTranslation(language, "emergencyContacts")}</CardTitle>
                <CardDescription className="text-base" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "addTrustedContacts")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#3F72AF] hover:bg-[#112D4E] text-base py-5">
                  {getTranslation(language, "manageContacts")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-6">
          <h2 className="text-[#112D4E] text-center text-4xl" style={{ fontWeight: 900 }}>{getTranslation(language, "helpfulFeatures")}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card
              className="hover:shadow-lg transition-all cursor-pointer border-[#3F72AF] bg-white"
              onClick={onNavigateToCalendar}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-[#DBE2EF] rounded-full flex items-center justify-center mb-3">
                  <CheckSquare className="w-6 h-6 text-[#3F72AF]" />
                </div>
                <CardTitle className="text-[#112D4E]" style={{ fontWeight: 700 }}>{getTranslation(language, "medicationAdherence")}</CardTitle>
                <CardDescription className="text-sm" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "trackHistory")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="hover:shadow-lg transition-all cursor-pointer border-[#3F72AF] bg-white"
              onClick={onNavigateToVoice}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-[#DBE2EF] rounded-full flex items-center justify-center mb-3">
                  <Mic className="w-6 h-6 text-[#3F72AF]" />
                </div>
                <CardTitle className="text-[#112D4E]" style={{ fontWeight: 700 }}>{getTranslation(language, "voiceAssistant")}</CardTitle>
                <CardDescription className="text-sm" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "askAboutMeds")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="hover:shadow-lg transition-all cursor-pointer border-[#3F72AF] bg-white"
              onClick={onNavigateToPillSetup}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-[#DBE2EF] rounded-full flex items-center justify-center mb-3">
                  <Pill className="w-6 h-6 text-[#3F72AF]" />
                </div>
                <CardTitle className="text-[#112D4E]" style={{ fontWeight: 700 }}>{getTranslation(language, "visualPillSetup")}</CardTitle>
                <CardDescription className="text-sm" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "identifyPills")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="hover:shadow-lg transition-all cursor-pointer border-[#3F72AF] bg-white"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-[#DBE2EF] rounded-full flex items-center justify-center mb-3">
                  <Languages className="w-6 h-6 text-[#3F72AF]" />
                </div>
                <CardTitle className="text-[#112D4E]" style={{ fontWeight: 700 }}>{getTranslation(language, "multilingualSupport")}</CardTitle>
                <CardDescription className="text-sm" style={{ fontWeight: 600 }}>
                  {getTranslation(language, "switchLanguages")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="space-y-6">
          <h2 className="text-[#112D4E] text-center text-4xl" style={{ fontWeight: 900 }}>{getTranslation(language, "howToUse")}</h2>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-[#112D4E] flex items-center justify-center relative">
                <Button
                  size="lg"
                  className="relative z-10 bg-white text-[#112D4E] hover:bg-[#DBE2EF] rounded-full w-20 h-20"
                >
                  <Video className="w-10 h-10" />
                </Button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xl" style={{ fontWeight: 700 }}>{getTranslation(language, "watchTutorial")}</p>
                  <p className="text-sm text-[#DBE2EF]">{getTranslation(language, "learnFeatures")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md border border-[#3F72AF]">
              <div className="text-5xl mb-3">📱</div>
              <p className="text-[#112D4E] mb-2" style={{ fontWeight: 700 }}>{getTranslation(language, "easyToUse")}</p>
              <p className="text-[#3F72AF] text-sm">{getTranslation(language, "simpleInterface")}</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md border border-[#3F72AF]">
              <div className="text-5xl mb-3">🔔</div>
              <p className="text-[#112D4E] mb-2" style={{ fontWeight: 700 }}>{getTranslation(language, "smartReminders")}</p>
              <p className="text-[#3F72AF] text-sm">{getTranslation(language, "neverMissTime")}</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md border border-[#3F72AF]">
              <div className="text-5xl mb-3">🆘</div>
              <p className="text-[#112D4E] mb-2" style={{ fontWeight: 700 }}>{getTranslation(language, "emergencySupport")}</p>
              <p className="text-[#3F72AF] text-sm">{getTranslation(language, "oneButtonAway")}</p>
            </div>
          </div>
        </section>
      </div>
      
      {/* AI Chatbot */}
      <AIChatbot language={language} />
      
      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
