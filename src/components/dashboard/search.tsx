import React, { useState, useRef, useEffect } from "react";
import { X, User, Users, Building2, Truck, Pizza } from "lucide-react";
import { HiHomeModern, HiOutlineHomeModern, HiOutlineUser, HiOutlineUsers, HiUser } from "react-icons/hi2";

interface Contact {
  id: string;
  name: string;
  type: "person" | "family" | "company";
  phone?: string;
  email?: string;
  icon?: string;
  age?: number;
}

interface ContactSearchProps {
  onClose?: () => void;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Brooke Thomas",
    type: "person",
    phone: "(567) 890 1234",
    age: 25,
  },
  {
    id: "2",
    name: "Carl's Trucks",
    type: "company",
    email: "kevin.brown9045@gmail.com",
    icon: "truck",
  },
  {
    id: "3",
    name: "Darlene Hook",
    type: "person",
    phone: "(678) 345 9045",
    age: 21,
  },
  { id: "4", name: "Family Johnson", type: "family", phone: "(904) 678 9012" },
  {
    id: "5",
    name: "Jason Whitman",
    type: "person",
    phone: "(904) 678 9901",
    age: 21,
  },
  {
    id: "6",
    name: "Jennifer Kent",
    type: "person",
    phone: "(567) 890 9043",
    age: 27,
  },
  {
    id: "7",
    name: "Johnson Bros. Inc.",
    type: "company",
    email: "lisa.jones904@gmail.com",
  },
  {
    id: "8",
    name: "Pedro's Pizzeria",
    type: "company",
    email: "sarah.wilson6904@gmail.com",
    icon: "pizza",
  },
];

const getIcon = (contact: Contact) => {
  if (contact.icon === "truck")
    return <Truck className="w-5 h-5" style={{ color: "#306C6A" }} />;
  if (contact.icon === "pizza")
    return <Pizza className="w-5 h-5" style={{ color: "#306C6A" }} />;
  if (contact.type === "family")
    return <HiOutlineUsers className="w-5 h-5" style={{ color: "#306C6A" }} />;
  if (contact.type === "company")
    return <HiOutlineHomeModern className="w-5 h-5" style={{ color: "#306C6A" }} />;
  return <HiOutlineUser className="w-5 h-5" style={{ color: "#306C6A" }}  />;
};

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="text-white px-1 rounded bg-[#306C6A]">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default function ContactSearch({ onClose }: ContactSearchProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("A→Z");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const matchesQuery =
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.phone?.includes(query) ||
      contact.email?.includes(query);

    if (activeFilter === "All") return matchesQuery;
    if (activeFilter === "Opportunities")
      return matchesQuery && contact.type === "person";
    if (activeFilter === "Categories")
      return matchesQuery && contact.type === "family";
    if (activeFilter === "Companies")
      return matchesQuery && contact.type === "company";
    return matchesQuery;
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortBy === "A→Z") return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  return (
    <div className="h-[80vh] max-h-[600px] w-[700px] max-md:w-full max-w-[90%] flex flex-col bg-white rounded-3xl shadow-2xl">
      {/* Header with search input */}
      {/* <div className="flex items-center justify-between px-72 mx-72 "></div> */}
      <div className="w-full h-fit flex flex-col gap-5 px-5 pt-5 pb-4 border-b">
        <div className="flex  items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search.."
              className="bg-gray-100 placeholder:text-text_color/50 px-4 w-full mr-4 py-2.5 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#306C6A] min-w-0"
            />
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex max-md:flex-wrap gap-0 max-md:gap-2 overflow-x-auto pb-1">
            {["All", "Opportunities", "Categories", "Companies"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors select-none ${
                    activeFilter === filter
                      ? "text-white"
                      : "text-text_color/60 hover:text-gray-800"
                  }`}
                  style={
                    activeFilter === filter
                      ? { backgroundColor: "#306C6A" }
                      : {}
                  }
                >
                  {filter}
                </button>
              )
            )}
          </div>
          <button
            onClick={() => setSortBy(sortBy === "A→Z" ? "Z→A" : "A→Z")}
            className="flex items-center gap-1 ring-1 ring-stone-200 py-1.5 px-2 rounded-lg text-text_color/70 hover:text-gray-800"
          >
            <span className="text-xl leading-3 translate-y-[-2px] max-md:hidden">↕</span>
            <span className="text-xs font-medium max-md:hidden">Sort by: {sortBy}</span>
            <span className="text-xs font-medium hidden max-md:flex">{sortBy}</span>
          </button>
        </div>
      </div>
      {/* Contacts List */}
      <div className="overflow-y-auto flex-1">
        {sortedContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2 px-5 py-2 cursor-pointer hover:bg-gray-50 border-b border-stone-100 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                {getIcon(contact)}
              </div>
              <div>
                <div className="font-medium text-base max-md:text-sm text-text_color/90">
                  {highlightText(contact.name, query)}
                  {contact.age && (
                    <span className="text-gray-500 ml-1">({contact.age})</span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right text-sm">
              {contact.phone && (
                <div className="text-text_color/70 truncate">
                  {highlightText(contact.phone, query)}
                </div>
              )}
              {contact.email && (
                <div className="text-text_color/70 truncate">
                  {highlightText(contact.email, query)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="rounded-xl h-fit flex items-center justify-between p-5 bg-gray-50 text-xs text-gray-600">
        <span>
          <kbd className="bg-white px-2 py-1 leading-3 rounded border border-gray-200 text-main_color font-medium">
            ESC
          </kbd>{" "}
          to close
        </span>
        <span className="max-md:hidden">
          <kbd className="bg-white px-1 py-0.5 rounded border border-gray-200">
            ↑
          </kbd>{" "}
          <kbd className="bg-white px-1 py-0.5 rounded border border-gray-200">
            ↓
          </kbd>{" "}
          to navigate
        </span>
        <span>
          <kbd className="bg-white px-2 py-0.5 rounded border border-gray-200">
            ⏎
          </kbd>{" "}
          to select
        </span>
      </div>
    </div>
  );
}
