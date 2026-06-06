import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

import {
  useState,
  useEffect
} from "react";

import {
  Home,
  FileText,
  MessageCircle,
  User,
  PlusCircle,
  Moon,
  LogOut
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import FloatingChat from "../components/FloatingChat";

import api from "../api";

export default function UserDashboard() {

  // =========================
  // STATE
  // =========================
  const [darkMode, setDarkMode] = useState(false);

  const [complaints, setComplaints] = useState([]);

  const navigate = useNavigate();

  const userId =
    localStorage.getItem("userId");

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
  };

  // =========================
  // FETCH COMPLAINTS
  // =========================
  useEffect(() => {

    const fetchComplaints = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await api.get(
          `/api/complaints/user/${userId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
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

  // =========================
  // STATISTIK
  // =========================
  const total = complaints.length;

  const diproses =
    complaints.filter(
      c => c.status === "PROSES"
    ).length;

  const selesai =
    complaints.filter(
      c => c.status === "SELESAI"
    ).length;

  const pending =
    complaints.filter(
      c => c.status === "PENDING"
    ).length;

  // =========================
  // PIE DATA
  // =========================
  const data = [
    {
      name: "Selesai",
      value: selesai || 0
    },
    {
      name: "Diproses",
      value: diproses || 0
    },
    {
      name: "Pending",
      value: pending || 0
    },
  ];

  const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444"
  ];

  // =========================
  // FORMAT TANGGAL
  // =========================
  const formatTanggal = (dateStr) => {

    if (!dateStr) return "-";

    return new Date(dateStr)
      .toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      );
  };

  // =========================
  // STATUS COLOR
  // =========================
  const statusColor = (status) => {

    if (status === "SELESAI")
      return "text-green-500";

    if (status === "PROSES")
      return "text-yellow-500";

    if (status === "DITOLAK")
      return "text-red-500";

    return "text-orange-500";
  };

  // =========================
  // STATUS LABEL
  // =========================
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

    <div
      className={
        darkMode
          ? "flex min-h-screen bg-slate-900 text-white"
          : "flex min-h-screen bg-slate-100 text-black"
      }
    >

      {/* SIDEBAR */}
      <div
        className={`w-[250px] p-6 flex flex-col justify-between ${
          darkMode
            ? "bg-slate-800"
            : "bg-cyan-600"
        } text-white`}
      >

        <div>

          <h1 className="text-3xl font-bold mb-10">
            CiviCare
          </h1>

          <div className="space-y-4">

            {/* DASHBOARD */}
            <button
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-700"
            >

              <Home />

              Dashboard

            </button>

            {/* PENGADUAN */}
            <Link
              to="/create-report"
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-700"
            >

              <FileText />

              Pengaduan Saya

            </Link>

            {/* BANTUAN */}
            <Link
              to="/chatbot"
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-700"
            >

              <MessageCircle />

              Bantuan

            </Link>

            {/* PROFILE */}
            <Link
              to="/profile"
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-700"
            >

              <User />

              Profile

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
        <h1 className="text-4xl font-bold">

          Dashboard Masyarakat

        </h1>

        <p
          className={
            darkMode
              ? "mt-2 text-slate-300"
              : "mt-2 text-gray-500"
          }
        >

          Selamat datang di layanan pengaduan masyarakat CiviCare.

        </p>

        {/* DARK MODE */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="mt-5 flex items-center gap-2 bg-slate-800 text-white px-5 py-3 rounded-2xl hover:bg-slate-700"
        >

          <Moon size={20} />

          {darkMode
            ? "Light Mode"
            : "Dark Mode"}

        </button>

        {/* BUTTON BUAT PENGADUAN */}
        <Link
          to="/create-report"
          className="mt-8 inline-flex items-center gap-3 bg-cyan-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:bg-cyan-700"
        >

          <PlusCircle />

          Buat Pengaduan Baru

        </Link>

        {/* CARD */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* TOTAL */}
          <div
            className={
              darkMode
                ? "bg-slate-800 p-6 rounded-3xl shadow-lg"
                : "bg-white p-6 rounded-3xl shadow-lg"
            }
          >

            <h2
              className={
                darkMode
                  ? "text-slate-300"
                  : "text-gray-500"
              }
            >

              Total Pengaduan

            </h2>

            <p className="text-5xl font-bold text-cyan-600 mt-4">

              {total}

            </p>

          </div>

          {/* DIPROSES */}
          <div
            className={
              darkMode
                ? "bg-slate-800 p-6 rounded-3xl shadow-lg"
                : "bg-white p-6 rounded-3xl shadow-lg"
            }
          >

            <h2
              className={
                darkMode
                  ? "text-slate-300"
                  : "text-gray-500"
              }
            >

              Diproses

            </h2>

            <p className="text-5xl font-bold text-yellow-500 mt-4">

              {diproses}

            </p>

          </div>

          {/* SELESAI */}
          <div
            className={
              darkMode
                ? "bg-slate-800 p-6 rounded-3xl shadow-lg"
                : "bg-white p-6 rounded-3xl shadow-lg"
            }
          >

            <h2
              className={
                darkMode
                  ? "text-slate-300"
                  : "text-gray-500"
              }
            >

              Selesai

            </h2>

            <p className="text-5xl font-bold text-green-500 mt-4">

              {selesai}

            </p>

          </div>

        </div>

        {/* STATISTIK */}
        <div
          className={
            darkMode
              ? "bg-slate-800 mt-10 rounded-3xl shadow-lg p-6"
              : "bg-white mt-10 rounded-3xl shadow-lg p-6"
          }
        >

          <h2 className="text-2xl font-bold mb-6">

            Statistik Pengaduan

          </h2>

          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {data.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />

                  ))}

                </Pie>

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* RIWAYAT */}
        <div
          className={
            darkMode
              ? "bg-slate-800 mt-10 rounded-3xl shadow-lg p-6"
              : "bg-white mt-10 rounded-3xl shadow-lg p-6"
          }
        >

          <h2 className="text-2xl font-bold mb-6">

            Riwayat Pengaduan

          </h2>

          <table className="w-full">

            <thead>

              <tr
                className={
                  darkMode
                    ? "text-left border-b border-slate-700"
                    : "text-left border-b"
                }
              >

                <th className="pb-3">
                  Laporan
                </th>

                <th className="pb-3">
                  Tanggal
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

                complaints.map((c) => (

                  <tr
                    key={c.id}
                    className={
                      darkMode
                        ? "border-b border-slate-700"
                        : "border-b"
                    }
                  >

                    <td className="py-4">

                      {c.judul}

                    </td>

                    <td>

                      {formatTanggal(
                        c.createdAt
                      )}

                    </td>

                    <td
                      className={
                        statusColor(c.status)
                      }
                    >

                      {statusLabel(c.status)}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* FLOATING CHAT HANYA USER */}
        <FloatingChat />

    </div>
  );
}