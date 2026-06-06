import { LayoutDashboard, FileText, Users, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FloatingChat from "../components/FloatingChat";
import api from "../api";

export default function AdminPengaduan() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/complaints", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaints(res.data.data);
      } catch (err) {
        console.error("Gagal ambil data pengaduan", err);
      }
    };
    fetchComplaints();
  }, []);

  const statusColor = (status) => {
    if (status === "SELESAI") return "text-green-500";
    if (status === "PROSES") return "text-yellow-500";
    if (status === "DITOLAK") return "text-red-500";
    return "text-orange-500";
  };

  const statusLabel = (status) => {
    if (status === "SELESAI") return "Selesai";
    if (status === "PROSES") return "Diproses";
    if (status === "DITOLAK") return "Ditolak";
    return "Pending";
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(`/api/complaints/${id}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Berhasil! Status: " + status);
      setComplaints(complaints.map(c => c.id === id ? { ...c, status } : c));
    } catch (err) {
      alert("Gagal! Error: " + (err.response?.status || err.message));
      console.error("Gagal update status", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus pengaduan ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/complaints/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(complaints.filter(c => c.id !== id));
    } catch (err) {
      console.error("Gagal hapus pengaduan", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <div className="w-[250px] bg-blue-700 text-white p-6">
        <h1 className="text-3xl font-bold mb-10">CiviCare</h1>
        <div className="space-y-4">
          <Link to="/admindashboard" className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600">
            <LayoutDashboard />Dashboard
          </Link>
          <Link to="/admin/pengaduan" className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600 bg-blue-800">
            <FileText />Pengaduan
          </Link>
          <Link to="/admin/masyarakat" className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600">
            <Users />Masyarakat
          </Link>
          <Link to="/chatbot" className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600">
            <Bot />AI Assistant
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-slate-800">Kelola Pengaduan</h1>
        <p className="text-gray-500 mt-2">Daftar semua pengaduan masyarakat.</p>

        <div className="bg-white mt-8 rounded-3xl shadow-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Nama</th>
                <th className="pb-3">Judul</th>
                <th className="pb-3">Deskripsi</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr><td colSpan="5" className="py-4 text-center text-gray-400">Belum ada pengaduan</td></tr>
              ) : (
                complaints.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="py-4">{c.userName}</td>
                    <td>{c.judul}</td>
                    <td className="text-sm text-gray-500">{c.deskripsi?.substring(0, 50)}...</td>
                    <td className={statusColor(c.status)}>{statusLabel(c.status)}</td>
                    <td>
                      <div className="flex gap-2">
                        <select
                          className="text-sm border rounded-lg p-1"
                          value={c.status}
                          onChange={(e) => handleUpdateStatus(c.id, e.target.value)}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PROSES">Diproses</option>
                          <option value="SELESAI">Selesai</option>
                          <option value="DITOLAK">Ditolak</option>
                        </select>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FloatingChat />
    </div>
  );
}