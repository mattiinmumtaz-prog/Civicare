import { Upload, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreateReport() {
  const [image, setImage] = useState(null);
  const [fileObj, setFileObj] = useState(null);

  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Infrastruktur");
  const [deskripsi, setDeskripsi] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileObj(file);
      setImage(URL.createObjectURL(file));
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    if (!judul || !deskripsi) {
      setError("Judul dan deskripsi wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const formData = new FormData();

      const data = {
        judul,
        kategori,
        deskripsi
      };

      formData.append(
        "data",
        new Blob(
          [JSON.stringify(data)],
          { type: "application/json" }
        )
      );

      if (fileObj) {
        formData.append("file", fileObj);
      }

      await api.post(
        `/api/complaints?userId=${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Pengaduan berhasil dikirim!");

      navigate("/userdashboard");

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Gagal mengirim pengaduan"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/userdashboard")}
            className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200"
          >
            <ArrowLeft />
          </button>

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Buat Pengaduan
            </h1>

            <p className="text-gray-500 mt-1">
              Laporkan masalah masyarakat dengan lengkap dan jelas.
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-6 bg-red-100 text-red-600 p-4 rounded-2xl">
            {error}
          </div>
        )}

        <div className="mt-10 space-y-8">

          {/* JUDUL */}
          <div>
            <label className="font-semibold text-slate-700">
              Judul Pengaduan
            </label>

            <input
              type="text"
              placeholder="Contoh: Jalan Rusak"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full mt-3 p-4 border rounded-2xl outline-none focus:border-cyan-500"
            />
          </div>

          {/* KATEGORI */}
          <div>
            <label className="font-semibold text-slate-700">
              Kategori
            </label>

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full mt-3 p-4 border rounded-2xl outline-none focus:border-cyan-500"
            >
              <option value="Infrastruktur">Infrastruktur</option>
              <option value="Kebersihan">Kebersihan</option>
              <option value="Keamanan">Keamanan</option>
              <option value="Pelayanan Publik">Pelayanan Publik</option>
            </select>
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="font-semibold text-slate-700">
              Deskripsi
            </label>

            <textarea
              rows="7"
              placeholder="Jelaskan masalah secara detail..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full mt-3 p-4 border rounded-2xl outline-none focus:border-cyan-500"
            />
          </div>

          {/* UPLOAD */}
          <div>
            <label className="font-semibold text-slate-700">
              Upload Gambar
            </label>

            <div className="mt-4 border-2 border-dashed border-cyan-300 rounded-3xl p-10 text-center">

              <Upload
                size={55}
                className="mx-auto text-cyan-600"
              />

              <p className="mt-4 text-gray-500">
                Upload gambar bukti pengaduan
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-5"
              />

              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mt-8 w-full max-h-[400px] object-cover rounded-2xl shadow-lg"
                />
              )}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-5 rounded-2xl shadow-lg hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading ? "Mengirim Pengaduan..." : "Kirim Pengaduan"}
          </button>

        </div>
      </div>
    </div>
  );
}