import { useState } from "react";
import { Send, Bot, X, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Language, getTranslation } from "../utils/translations";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  time: string;
}

interface AIChatbotProps {
  language: Language;
}

export function AIChatbot({ language }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: getTranslation(language, "chatbotGreeting"),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInputValue("");
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Greetings
    if (input.includes("hello") || input.includes("hi") || input.includes("hey") || input.includes("नमस्ते") || input.includes("नमस्कार") || input.includes("السلام") || input.includes("வணக்கம்") || input.includes("হ্যালো")) {
      return getTranslation(language, "chatbotGreeting");
    }
    
    // Help requests
    if (input.includes("help") || input.includes("how") || input.includes("मदद") || input.includes("कैसे") || input.includes("مدد") || input.includes("உதவி") || input.includes("সাহায্য")) {
      return getTranslation(language, "chatbotDefaultResponse");
    }

    // Medication related
    if (input.includes("medication") || input.includes("medicine") || input.includes("drug") || input.includes("दवा") || input.includes("औषध") || input.includes("دوا") || input.includes("மருந்து") || input.includes("ওষুধ")) {
      if (input.includes("add") || input.includes("schedule") || input.includes("जोड़") || input.includes("अनुसूची")) {
        return getTranslation(language, "chatbotMedicationResponse");
      }
      if (input.includes("miss") || input.includes("forget") || input.includes("भूल") || input.includes("छूट")) {
        return getTranslation(language, "chatbotReminderResponse");
      }
      return getTranslation(language, "chatbotMedicationResponse");
    }

    // Emergency
    if (input.includes("emergency") || input.includes("sos") || input.includes("urgent") || input.includes("आपात") || input.includes("आपत्") || input.includes("ہنگامی") || input.includes("அவசர") || input.includes("জরুরি")) {
      return getTranslation(language, "chatbotEmergencyResponse");
    }

    // Reminders
    if (input.includes("reminder") || input.includes("time") || input.includes("alarm") || input.includes("रिमाइंडर") || input.includes("स्मरणपत्र") || input.includes("یاد دہانی") || input.includes("நினைவூட்டல்") || input.includes("অনুস্মারক")) {
      return getTranslation(language, "chatbotReminderResponse");
    }

    // Contacts
    if (input.includes("contact") || input.includes("doctor") || input.includes("call") || input.includes("संपर्क") || input.includes("डॉक्टर") || input.includes("رابط") || input.includes("தொடர்பு") || input.includes("যোগাযোগ")) {
      return getTranslation(language, "chatbotContactResponse");
    }

    // Calendar and tracking
    if (input.includes("calendar") || input.includes("track") || input.includes("history") || input.includes("adherence") || input.includes("कैलेंडर") || input.includes("कॅलेंडर") || input.includes("کیلنڈر") || input.includes("காலண்டர்") || input.includes("ক্যালেন্ডার")) {
      return getTranslation(language, "chatbotCalendarResponse");
    }

    // Voice assistant
    if (input.includes("voice") || input.includes("speak") || input.includes("वॉयस") || input.includes("व्हॉइस") || input.includes("صوتی") || input.includes("குரல்") || input.includes("ভয়েস")) {
      return getTranslation(language, "chatbotVoiceResponse");
    }

    // Pill identification
    if (input.includes("pill") || input.includes("color") || input.includes("shape") || input.includes("identify") || input.includes("गोली") || input.includes("रंग") || input.includes("گولی") || input.includes("மாத்திரை") || input.includes("পিল")) {
      return getTranslation(language, "chatbotPillResponse");
    }

    // Thanks
    if (input.includes("thank") || input.includes("धन्यवाद") || input.includes("شکریہ") || input.includes("நன்றி") || input.includes("ধন্যবাদ")) {
      const thanks = {
        en: "You're welcome! I'm here to help you manage your health. 😊",
        hi: "आपका स्वागत है! मैं आपके स्वास्थ्य प्रबंधन में मदद के लिए यहाँ हूँ। 😊",
        mr: "तुमचे स्वागत आहे! मी तुमच्या आरोग्य व्यवस्थापनात मदत करण्यासाठी येथे आहे। 😊",
        ur: "آپ کا استقبال ہے! میں آپ کی صحت کے انتظام میں مدد کے لیے یہاں ہوں۔ 😊",
        ta: "நல்வரவு! உங்கள் ஆரோக்கியத்தை நிர்வகிக்க நான் இங்கு இருக்கிறேன். 😊",
        bn: "আপনাকে স্বাগতম! আমি আপনার স্বাস্থ্য পরিচালনায় সাহায্য করতে এখানে আছি। 😊",
      };
      return thanks[language];
    }

    // Default response
    return getTranslation(language, "chatbotDefaultResponse");
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1C6EA4] hover:bg-[#154D71] shadow-2xl z-40 transition-all hover:scale-110"
        >
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 left-4 md:left-auto md:bottom-8 md:right-8 w-auto md:w-96 h-[500px] max-h-[80vh] shadow-2xl z-40 flex flex-col border-2 border-[#1C6EA4]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#154D71] to-[#1C6EA4] text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-[#1C6EA4]" />
              </div>
              <div>
                <p>{getTranslation(language, "aiAssistant")}</p>
                <p className="text-xs text-[#FFF9AF]">{getTranslation(language, "alwaysHere")}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-[#FFF9AF]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-[#1C6EA4] text-white rounded-br-none"
                        : "bg-white text-[#154D71] border border-[#33A1E0] rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === "user" ? "text-[#FFF9AF]" : "text-[#1C6EA4]"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-[#33A1E0] bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={getTranslation(language, "typeQuestion")}
                className="flex-1 border-[#1C6EA4] focus:border-[#154D71]"
              />
              <Button
                onClick={handleSend}
                className="bg-[#1C6EA4] hover:bg-[#154D71]"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
