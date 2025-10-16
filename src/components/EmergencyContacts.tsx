import { useState } from "react";
import { Plus, Trash2, Phone, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner@2.0.3";
import { Language, getTranslation } from "../utils/translations";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

interface EmergencyContactsProps {
  onSave: (contacts: Contact[]) => void;
  initialContacts?: Contact[];
  language: Language;
}

export function EmergencyContacts({ onSave, initialContacts = [], language }: EmergencyContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relation: "family",
  });

  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error(getTranslation(language, "pleaseEnterPillName"));
      return;
    }

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      relation: newContact.relation,
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", phone: "", relation: "family" });
    toast.success(getTranslation(language, "addContact"));
  };

  const removeContact = (contactId: string) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
    toast.success(getTranslation(language, "deleteContact"));
  };

  const handleSave = () => {
    onSave(contacts);
    toast.success(getTranslation(language, "saveContacts"));
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#1C6EA4]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-[#154D71]" />
            {getTranslation(language, "addNewContact")}
          </CardTitle>
          <CardDescription>
            {getTranslation(language, "addTrustedContacts")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">{getTranslation(language, "contactName")}</Label>
              <Input
                id="contact-name"
                placeholder={getTranslation(language, "enterContactName")}
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{getTranslation(language, "phoneNumber")}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={getTranslation(language, "enterPhoneNumber")}
                value={newContact.phone}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="relation">{getTranslation(language, "relationship")}</Label>
              <Select
                value={newContact.relation}
                onValueChange={(value) =>
                  setNewContact({ ...newContact, relation: value })
                }
              >
                <SelectTrigger id="relation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">{getTranslation(language, "familyMember")}</SelectItem>
                  <SelectItem value="doctor">{getTranslation(language, "doctor")}</SelectItem>
                  <SelectItem value="caregiver">{getTranslation(language, "caregiver")}</SelectItem>
                  <SelectItem value="friend">{getTranslation(language, "friend")}</SelectItem>
                  <SelectItem value="neighbor">{getTranslation(language, "neighbor")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={addContact} className="w-full bg-[#1C6EA4] hover:bg-[#154D71]">
            <Plus className="w-4 h-4 mr-2" />
            {getTranslation(language, "addContact")}
          </Button>
        </CardContent>
      </Card>

      {contacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{getTranslation(language, "emergencyContactsPage")}</CardTitle>
            <CardDescription>
              {contacts.length} {getTranslation(language, "addContact")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 border border-[#33A1E0] rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#33A1E0] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#154D71]">{contact.name}</h4>
                    <p className="text-[#1C6EA4]">{contact.phone}</p>
                    <p className="text-sm text-[#1C6EA4] capitalize">{contact.relation}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeContact(contact.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button onClick={handleSave} className="w-full bg-[#1C6EA4] hover:bg-[#154D71]">
              {getTranslation(language, "saveContacts")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
