import { useState, useEffect } from "react";

import {
  Send,
  Headset
} from "lucide-react";

import axios from "axios";

export default function CSAdmin() {

  // =========================
  // STATE CHAT
  // =========================
  const [messages, setMessages] = useState([]);

  // =========================
  // STATE INPUT
  // =========================
  const [input, setInput] = useState("");

  // =========================
  // USERNAME LOGIN
  // =========================
  const username =
    localStorage.getItem("username") || "guest";

  // =========================
  // FETCH CHAT USER
  // =========================
  const fetchMessages = async () => {

    try {

      const response = await axios.get(
        `https://civicare-production.up.railway.app${username}`
      );

      setMessages(response.data);

    } catch (error) {

      console.error("Gagal mengambil chat", error);

    }
  };

  // =========================
  // AUTO REFRESH CHAT
  // =========================
  useEffect(() => {

    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(interval);

  }, []);

  // =========================
  // FUNCTION SEND MESSAGE
  // =========================
  const sendMessage = async () => {

    // JIKA INPUT KOSONG
    if (input.trim() === "") return;

    try {

      // =========================
      // KIRIM KE BACKEND
      // =========================
      await axios.post(
        "https://civicare-production.up.railway.app",
        {
          username: username,
          sender: username,
          role: "USER",
          message: input,
        }
      );

      // CLEAR INPUT
      setInput("");

      // REFRESH CHAT
      fetchMessages();

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-green-600 text-white p-5 flex items-center gap-3">

          <Headset />

          <div>

            <h1 className="text-xl font-bold">
              CiviCare CS Admin
            </h1>

            <p className="text-sm opacity-80">
              Customer Service Online
            </p>

          </div>

        </div>

        {/* AREA CHAT */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-slate-50">

          {messages.length === 0 ? (

            <div className="text-center text-gray-400 mt-10">
              Belum ada pesan
            </div>

          ) : (

            messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.role === "USER"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[70%] px-5 py-3 rounded-2xl shadow ${
                    msg.role === "USER"
                      ? "bg-green-600 text-white"
                      : "bg-white text-slate-700"
                  }`}
                >

                  <div className="text-xs opacity-70 mb-1">

                    {msg.sender}

                  </div>

                  {msg.message}

                </div>

              </div>

            ))

          )}

        </div>

        {/* INPUT AREA */}
        <div className="p-4 border-t flex items-center gap-3">

          <input
            type="text"
            placeholder="Tulis pesan..."
            value={input}

            onChange={(e) => setInput(e.target.value)}

            // ENTER UNTUK SEND
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}

            className="flex-1 p-4 border rounded-2xl outline-none focus:border-green-500"
          />

          {/* BUTTON SEND */}
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white p-4 rounded-2xl hover:bg-green-700"
          >

            <Send size={20} />

          </button>

        </div>

      </div>

    </div>
  );
}