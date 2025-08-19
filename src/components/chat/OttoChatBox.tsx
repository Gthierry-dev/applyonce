import React, { useState } from "react";
import { HelpCircle, Send } from "lucide-react";

type Message = {
  id: string;
  role: "otto" | "user";
  text: string;
};

const OttoChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "otto",
      text:
        "Welcome back, Gusenga Thierry! It's great to see you again. Let's resume your journey towards your dream job.",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: trimmed },
      { id: crypto.randomUUID(), role: "otto", text: "Thanks! Otto will reply soon." },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-00 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm"><img src="./otto ai.png" alt="" /></span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Otto</h3>
            <p className="text-sm text-gray-600">Your AI Copilot</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full">
          <HelpCircle className="w-4 h-4" />
          Quick Guide
        </button>
      </div>

      {/* Messages */}
      <div className="px-6">
        {messages.map((m) => (
          <div key={m.id} className={`mb-4 ${m.role === "otto" ? "" : "text-right"}`}>
            {m.role === "otto" ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 inline-block max-w-[90%] text-left">
                <p className="text-gray-800 text-sm leading-relaxed">{m.text}</p>
              </div>
            ) : (
              <div className="bg-[#306C6A] text-white rounded-xl p-3 inline-block max-w-[90%]">
                <p className="text-sm leading-relaxed">{m.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-auto p-6">
        <div className="flex items-center gap-2 border rounded-2xl px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 outline-none text-sm placeholder:text-gray-400"
          />
          <button
            onClick={sendMessage}
            className="bg-[#306C6A] text-white px-3 py-1.5 rounded-xl text-sm hover:opacity-90 flex items-center gap-1"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default OttoChatBox;


