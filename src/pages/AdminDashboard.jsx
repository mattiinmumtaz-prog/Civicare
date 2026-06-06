import {
  LayoutDashboard,
  FileText,
  Users,
  Bot,
  LogOut,
  Headset
} from "lucide-react";

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../api";

export default function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);

  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
  };

  // FETCH DATA PENGADUAN
  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await api.get(
          "/api/complaints",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setComplaints(res.data.data);

      } catch (err) {

        console.error(
          "Gagal ambil data pengaduan",
          err
        );

      }
    };

    fetchComplaints();

  }, []);

  // TOTAL DATA
  const total = complaints.length;

  const diproses = complaints.filter(
    c => c.status === "PROSES"
  ).length;

  const selesai = complaints.filter(
    c => c.status === "SELESAI"
  ).length;

  // STATUS COLOR
  const statusColor = (status) => {

    if (status === "SELESAI")
      return "text-green-500";

    if (status === "PROSES")
      return "text-yellow-500";

    if (status === "DITOLAK")
      return "text-red-500";

    return "text-orange-500";
  };

  // STATUS LABEL
  const statusLabel = (status) => {

    if (status === "SELESAI")
      return "Selesai";

    if (status === "PROSES")
      return "Diproses";

    if (status === "DITOLAK")
      return "Ditolak";

    return "Pending";
  };

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <div className="w-[250px] bg-blue-700 text-white p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-3xl font-bold mb-10">
            CiviCare
          </h1>

          <div className="space-y-4">

            {/* DASHBOARD */}
            <Link
              to="/admindashboard"
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-blue-800 hover:bg-blue-600"
            >

              <LayoutDashboard />

              Dashboard

            </Link>

            {/* PENGADUAN */}
            <Link
              to="/admin/pengaduan"
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600"
            >

              <FileText />

              Pengaduan

            </Link>

            {/* MASYARAKAT */}
            <Link
              to="/admin/masyarakat"
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600"
            >

              <Users />

              Masyarakat

            </Link>

            {/* AI ASSISTANT */}
            <Link
              to="/chatbot"
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600"
            >

              <Bot />

              AI Assistant

            </Link>

            {/* LIVE CHAT */}
            <Link
              to="/admin/chat"
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600"
            >

              <Headset />

              Live Chat

            </Link>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl bg-red-500 hover:bg-red-600 mt-4"
        >

          <LogOut />

          Logout

        </button>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-slate-800">

          Dashboard Admin

        </h1>

        <p className="text-gray-500 mt-2">

          Selamat datang di sistem pelayanan masyarakat CiviCare.

        </p>

        {/* CARD STATISTIK */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* TOTAL */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-gray-500">
              Total Pengaduan
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-4">
              {total}
            </p>

          </div>

          {/* DIPROSES */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-gray-500">
              Diproses
            </h2>

            <p className="text-5xl font-bold text-yellow-500 mt-4">
              {diproses}
            </p>

          </div>

          {/* SELESAI */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-gray-500">
              Selesai
            </h2>

            <p className="text-5xl font-bold text-green-500 mt-4">
              {selesai}
            </p>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white mt-10 rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">

            Pengaduan Terbaru

          </h2>

          <table className="w-full">

            <thead>

              <tr className="text-left border-b">

                <th className="pb-3">
                  Nama
                </th>

                <th className="pb-3">
                  Laporan
                </th>

                <th className="pb-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {complaints.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="py-4 text-center text-gray-400"
                  >

                    Belum ada pengaduan

                  </td>

                </tr>

              ) : (

                complaints
                  .slice(0, 5)
                  .map((c) => (

                    <tr
                      key={c.id}
                      className="border-b"
                    >

                      <td className="py-4">
                        {c.userName}
                      </td>

                      <td>
                        {c.judul}
                      </td>

                      <td className={statusColor(c.status)}>

                        {statusLabel(c.status)}

                      </td>

                    </tr>

                  ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}