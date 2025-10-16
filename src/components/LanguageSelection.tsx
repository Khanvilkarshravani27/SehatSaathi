import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Language, getTranslation } from "../utils/translations";

interface LanguageSelectionProps {
  onSelectLanguage: (language: Language) => void;
  language: Language;
}

export function LanguageSelection({ onSelectLanguage, language }: LanguageSelectionProps) {
  const languages: Array<{ code: Language; name: string }> = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "mr", name: "मराठी" },
    { code: "ur", name: "اردو" },
    { code: "ta", name: "தமிழ்" },
    { code: "bn", name: "বাংলা" },
  ];

  return (
    <div className="min-h-screen bg-[#DBE2EF] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#3F72AF] rounded-full mb-6">
            <Globe className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-[#112D4E] mb-4 text-4xl" style={{ fontWeight: 900 }}>{getTranslation(language, "selectLanguage")}</h1>
          <p className="text-[#3F72AF] text-lg">{getTranslation(language, "chooseLanguage")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              variant="outline"
              className="h-24 border-2 border-[#3F72AF] hover:border-[#112D4E] hover:bg-[#DBE2EF] transition-all flex items-center justify-center"
            >
              <span className="text-3xl" style={{ fontWeight: 700 }}>{lang.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
