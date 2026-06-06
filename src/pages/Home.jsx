import { ShieldCheck, Bot, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-blue-700">
          CiviCare
        </h1>

        <div className="flex gap-4">

          <button className="text-gray-700 hover:text-blue-600">
            Home
          </button>

          <button className="text-gray-700 hover:text-blue-600">
            Services
          </button>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
          >
            Login
          </Link>

        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="px-10 py-20 grid md:grid-cols-2 items-center gap-10">

        <div>

          <h1 className="text-6xl font-bold text-slate-800 leading-tight">
            Smart Community
            <span className="text-blue-600"> Service System</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Platform digital pelayanan masyarakat modern untuk pengaduan,
            bantuan layanan, dan komunikasi langsung dengan admin.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/create-report"
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-700"
            >
              Mulai Pengaduan
            </Link>

            <button className="bg-white px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100">
              Pelajari
            </button>

          </div>

        </div>

        {/* IMAGE CARD */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-400 rounded-3xl p-10 shadow-2xl">

          <div className="bg-white rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-slate-800">
              AI Assistant
            </h2>

            <p className="text-gray-600 mt-2">
              Membantu masyarakat secara otomatis 24 jam.
            </p>

            <div className="mt-6 flex items-center gap-3 bg-slate-100 p-4 rounded-xl">

              <Bot className="text-blue-600" />

              <p className="text-gray-700">
                Halo, ada yang bisa saya bantu?
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="px-10 pb-20">

        <h2 className="text-4xl font-bold text-center text-slate-800">
          Fitur Utama
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {/* CARD 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 duration-300">

            <ShieldCheck size={50} className="text-blue-600" />

            <h3 className="text-2xl font-bold mt-5">
              Pengaduan Online
            </h3>

            <p className="text-gray-600 mt-3">
              Laporkan masalah masyarakat secara cepat dan mudah.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 duration-300">

            <Bot size={50} className="text-cyan-500" />

            <h3 className="text-2xl font-bold mt-5">
              AI Chatbot
            </h3>

            <p className="text-gray-600 mt-3">
              Chatbot pintar membantu masyarakat 24 jam.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 duration-300">

            <MessageCircle size={50} className="text-green-500" />

            <h3 className="text-2xl font-bold mt-5">
              Live Customer Service
            </h3>

            <p className="text-gray-600 mt-3">
              Hubungi admin langsung jika membutuhkan bantuan.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;