import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Language, getTranslation } from "../utils/translations";

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  return (
    <footer className="bg-[#154D71] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#1C6EA4]" fill="#1C6EA4" />
              </div>
              <span className="text-white"><strong>SehatSaathi</strong></span>
            </div>
            <p className="text-[#FFF9AF] text-sm">
              {getTranslation(language, "footerTagline")}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-[#1C6EA4] hover:bg-[#33A1E0] rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#1C6EA4] hover:bg-[#33A1E0] rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#1C6EA4] hover:bg-[#33A1E0] rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-[#1C6EA4] hover:bg-[#33A1E0] rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">{getTranslation(language, "quickLinks")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "home")}</a></li>
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "aboutUs")}</a></li>
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "features")}</a></li>
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "howItWorks")}</a></li>
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "faqs")}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4">{getTranslation(language, "support")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "helpCenter")}</a></li>
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "privacyPolicy")}</a></li>
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "termsOfService")}</a></li>
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "contactSupport")}</a></li>
              <li><a href="#" className="text-[#FFF9AF] hover:text-white transition-colors">{getTranslation(language, "safetyGuidelines")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">{getTranslation(language, "contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[#FFF9AF]">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-[#FFF9AF]">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">support@sehatsaathi.com</span>
              </li>
              <li className="flex items-start gap-2 text-[#FFF9AF]">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">123 Health Street, Medical District, Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1C6EA4] mt-8 pt-8 text-center">
          <p className="text-[#FFF9AF] text-sm">
            © {new Date().getFullYear()} <strong>SehatSaathi</strong>. {getTranslation(language, "allRightsReserved")}{" "}
            <Heart className="inline w-4 h-4 text-red-400" fill="currentColor" /> {getTranslation(language, "forBetterHealth")}
          </p>
        </div>
      </div>
    </footer>
  );
}
