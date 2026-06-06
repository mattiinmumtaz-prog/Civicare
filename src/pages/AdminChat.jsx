import { useEffect, useState } from "react";

import axios from "axios";

import {
  Send,
  Users,
  MessageCircleMore
} from "lucide-react";

export default function AdminChat() {

  const [chat, setChat] = useState([]);

  const [message, setMessage] = useState("");

  const [selectedUser, setSelectedUser] = useState("");

  // FETCH CHAT
  const fetchMessages = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/chat"
      );

      setChat(res.data);

    } catch (err) {

      console.error("Gagal ambil chat", err);

    }
  };

  // AUTO REFRESH
  useEffect(() => {

    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(interval);

  }, []);

  // AMBIL USER UNIK
  const users = [
    ...new Set(
      chat
        .filter((c) => c.username)
        .map((c) => c.username)
    )
  ];

  // FILTER CHAT USER TERPILIH
  const filteredChat = chat.filter(
    (c) => c.username === selectedUser
  );

  // SEND ADMIN MESSAGE
  const sendMessage = async () => {

    if (!message.trim()) return;

    if (!selectedUser) {

      alert("Pilih user terlebih dahulu");

      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/api/chat",
        {
          username: selectedUser,
          sender: "Admin",
          role: "ADMIN",
          message: message
        }
      );

      setMessage("");

      fetchMessages();

    } catch (err) {

      console.error("Gagal kirim pesan", err);

    }
  };

  return (

    <div className="h-screen bg-slate-100 flex">

      {/* SIDEBAR USER */}
      <div className="w-[320px] bg-white border-r flex flex-col">

        {/* HEADER */}
        <div className="bg-blue-600 text-white p-5 flex items-center gap-3 shadow">

          <Users />

          <div>

            <h1 className="font-bold text-lg">
              Admin Live Chat Panel
            </h1>

            <p className="text-sm opacity-80">
              Customer Service Dashboard
            </p>

          </div>

        </div>

        {/* USER LIST */}
        <div className="flex-1 overflow-y-auto">

          {users.length === 0 ? (

            <div className="text-center text-gray-400 mt-10">
              Belum ada user
            </div>

          ) : (

            users.map((user, index) => (

              <button
                key={index}
                onClick={() => setSelectedUser(user)}
                className={`w-full text-left p-5 border-b hover:bg-slate-100 transition ${
                  selectedUser === user
                    ? "bg-blue-50"
                    : ""
                }`}
              >

                <div className="flex items-center gap-3">

                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">

                    {user.charAt(0).toUpperCase()}

                  </div>

                  <div>

                    <h2 className="font-semibold text-slate-800">
                      {user.split("@")[0]}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Klik untuk membuka chat
                    </p>

                  </div>

                </div>

              </button>

            ))

          )}

        </div>

      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER CHAT */}
        <div className="bg-white border-b p-5 flex items-center gap-3 shadow-sm">

          <MessageCircleMore className="text-blue-600" />

          <div>

            <h1 className="font-bold text-xl text-slate-800">

              {selectedUser
                ? `Chat dengan ${selectedUser}`
                : "Pilih user terlebih dahulu"}

            </h1>

            <p className="text-sm text-gray-500">
              Live customer service conversation
            </p>

          </div>

        </div>

        {/* CHAT CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-100">

          {!selectedUser ? (

            <div className="h-full flex items-center justify-center text-gray-400">

              Pilih user untuk memulai chat

            </div>

          ) : filteredChat.length === 0 ? (

            <div className="text-center text-gray-400 mt-10">
              Belum ada pesan
            </div>

          ) : (

            filteredChat.map((c) => (

              <div
                key={c.id}
                className={`flex ${
                  c.role === "ADMIN"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[70%] px-5 py-3 rounded-2xl shadow ${
                    c.role === "ADMIN"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700"
                  }`}
                >

                  <div className="text-xs opacity-70 mb-1">

                    {c.sender}

                  </div>

                  {c.message}

                </div>

              </div>

            ))

          )}

        </div>

        {/* INPUT */}
        <div className="bg-white border-t p-4 flex gap-3">

          <input
            type="text"
            placeholder="Tulis balasan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}

            className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition"
          >

            <Send size={20} />

          </button>

        </div>

      </div>

    </div>

  );
}