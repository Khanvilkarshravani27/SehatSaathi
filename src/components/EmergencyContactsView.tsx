import { Phone, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Language, getTranslation } from "../utils/translations";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

interface EmergencyContactsViewProps {
  contacts: Contact[];
  language: Language;
}

export function EmergencyContactsView({ contacts, language }: EmergencyContactsViewProps) {
  const relationLabels: { [key: string]: string } = {
    family: "Family Member",
    doctor: "Doctor",
    caregiver: "Caregiver",
    friend: "Friend",
    neighbor: "Neighbor",
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#3F72AF]">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Users className="w-8 h-8 text-[#3F72AF]" />
            {getTranslation(language, "emergencyContactsTitle")}
          </CardTitle>
          <CardDescription className="text-lg">
            {contacts.length} contact{contacts.length !== 1 ? "s" : ""} available
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contacts.length === 0 ? (
            <div className="text-center py-12 text-[#3F72AF] text-lg">
              {getTranslation(language, "noContactsAdded")}
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-6 p-6 border-2 border-[#3F72AF] rounded-lg bg-[#DBE2EF]/30"
              >
                <div className="w-16 h-16 bg-[#3F72AF] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#112D4E] text-xl mb-1">{contact.name}</h4>
                  <p className="text-[#3F72AF] text-lg mb-1">{contact.phone}</p>
                  <p className="text-[#3F72AF] capitalize text-base">
                    {relationLabels[contact.relation] || contact.relation}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
