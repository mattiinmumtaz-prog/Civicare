import { LayoutDashboard, FileText, Users, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FloatingChat from "../components/FloatingChat";
import api from "../api";

export default function AdminMasyarakat() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.data);
      } catch (err) {
        console.error("Gagal ambil data user", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus user ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error("Gagal hapus user", err);
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
          <Link to="/admin/pengaduan" className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600">
            <FileText />Pengaduan
          </Link>
          <Link to="/admin/masyarakat" className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600 bg-blue-800">
            <Users />Masyarakat
          </Link>
          <Link to="/chatbot" className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-600">
            <Bot />AI Assistant
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-slate-800">Data Masyarakat</h1>
        <p className="text-gray-500 mt-2">Daftar semua pengguna yang terdaftar.</p>

        <div className="bg-white mt-8 rounded-3xl shadow-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Nama</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="4" className="py-4 text-center text-gray-400">Belum ada data</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="py-4">{u.nama}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Hapus
                      </button>
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