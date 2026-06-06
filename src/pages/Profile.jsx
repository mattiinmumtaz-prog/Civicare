import {
  User,
  Mail,
  ShieldCheck
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Profile() {

  const navigate = useNavigate();

  const nama =
    localStorage.getItem("nama");

  const username =
    localStorage.getItem("username");

  const role =
    localStorage.getItem("role");

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10">

        {/* HEADER */}
        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-cyan-600 text-white flex items-center justify-center text-5xl font-bold shadow-lg">

            {nama?.charAt(0).toUpperCase()}

          </div>

          <h1 className="text-3xl font-bold text-slate-800 mt-5">

            {nama}

          </h1>

          <p className="text-gray-500 mt-1">

            Profile Pengguna CiviCare

          </p>

        </div>

        {/* INFO */}
        <div className="mt-10 space-y-5">

          {/* NAMA */}
          <div className="bg-slate-100 rounded-2xl p-5 flex items-center gap-4">

            <User className="text-cyan-600" />

            <div>

              <p className="text-sm text-gray-500">
                Nama Lengkap
              </p>

              <h2 className="font-bold text-slate-800">
                {nama}
              </h2>

            </div>

          </div>

          {/* EMAIL / USERNAME */}
          <div className="bg-slate-100 rounded-2xl p-5 flex items-center gap-4">

            <Mail className="text-cyan-600" />

            <div>

              <p className="text-sm text-gray-500">
                Username / Email
              </p>

              <h2 className="font-bold text-slate-800">
                {username}
              </h2>

            </div>

          </div>

          {/* ROLE */}
          <div className="bg-slate-100 rounded-2xl p-5 flex items-center gap-4">

            <ShieldCheck className="text-cyan-600" />

            <div>

              <p className="text-sm text-gray-500">
                Role
              </p>

              <h2 className="font-bold text-slate-800">
                {role}
              </h2>

            </div>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-10 bg-cyan-600 text-white py-4 rounded-2xl hover:bg-cyan-700 transition"
        >

          Kembali

        </button>

      </div>

    </div>

  );
}