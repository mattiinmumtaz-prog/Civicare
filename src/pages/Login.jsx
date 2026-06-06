import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {

  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  // LOGIN STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // REGISTER STATE
  const [nama, setNama] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [konfirmPassword, setKonfirmPassword] = useState("");

  // UI STATE
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {

    setLoading(true);

    setError("");

    try {

      const response = await api.post(
        "/api/auth/login",
        {
          email,
          password
        }
      );

      // AMBIL DATA LOGIN
      const {
        token,
        role,
        nama,
        id
      } = response.data.data;

      // SIMPAN KE LOCAL STORAGE
      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "role",
        role
      );

      localStorage.setItem(
        "nama",
        nama
      );

      // INI YANG PENTING 😭
      localStorage.setItem(
        "username",
        email
      );

      localStorage.setItem(
        "userId",
        id
      );

      // REDIRECT BERDASARKAN ROLE
      if (role === "ADMIN") {

        navigate("/admindashboard");

      } else {

        navigate("/userdashboard");

      }

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login gagal, coba lagi"
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async () => {

    setError("");

    setSuccess("");

    if (
      !nama ||
      !regEmail ||
      !regPassword ||
      !konfirmPassword
    ) {

      setError("Semua field harus diisi");

      return;
    }

    if (regPassword !== konfirmPassword) {

      setError(
        "Password dan konfirmasi password tidak cocok"
      );

      return;
    }

    setLoading(true);

    try {

      await api.post(
        "/api/auth/register",
        {
          nama,
          email: regEmail,
          password: regPassword,
          role: "MASYARAKAT"
        }
      );

      setSuccess(
        "Akun berhasil dibuat! Silakan login."
      );

      setIsRegister(false);

      setNama("");

      setRegEmail("");

      setRegPassword("");

      setKonfirmPassword("");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registrasi gagal, coba lagi"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">

      <div className="bg-white w-[400px] p-10 rounded-3xl shadow-2xl">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center text-blue-700">
          CiviCare
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Smart Community Service System
        </p>

        {/* TAB */}
        <div className="flex mt-6 rounded-xl overflow-hidden border border-blue-200">

          <button
            onClick={() => {
              setIsRegister(false);
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2 text-sm font-medium duration-300 ${
              !isRegister
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >

            Login

          </button>

          <button
            onClick={() => {
              setIsRegister(true);
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2 text-sm font-medium duration-300 ${
              isRegister
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >

            Daftar Akun

          </button>

        </div>

        {/* ERROR */}
        {error && (

          <p className="mt-4 text-red-500 text-center text-sm">
            {error}
          </p>

        )}

        {/* SUCCESS */}
        {success && (

          <p className="mt-4 text-green-500 text-center text-sm">
            {success}
          </p>

        )}

        {/* LOGIN FORM */}
        {!isRegister ? (

          <>

            {/* EMAIL */}
            <div className="mt-6">

              <label className="text-gray-700 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:border-blue-500"
              />

            </div>

            {/* PASSWORD */}
            <div className="mt-5">

              <label className="text-gray-700 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:border-blue-500"
              />

            </div>

            {/* BUTTON LOGIN */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 duration-300 disabled:opacity-50"
            >

              {loading
                ? "Loading..."
                : "Login"}

            </button>

          </>

        ) : (

          <>
            {/* NAMA */}
            <div className="mt-6">

              <label className="text-gray-700 font-medium">
                Nama Lengkap
              </label>

              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChange={(e) =>
                  setNama(e.target.value)
                }
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:border-blue-500"
              />

            </div>

            {/* EMAIL */}
            <div className="mt-4">

              <label className="text-gray-700 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Masukkan email"
                value={regEmail}
                onChange={(e) =>
                  setRegEmail(e.target.value)
                }
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:border-blue-500"
              />

            </div>

            {/* PASSWORD */}
            <div className="mt-4">

              <label className="text-gray-700 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Masukkan password"
                value={regPassword}
                onChange={(e) =>
                  setRegPassword(e.target.value)
                }
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:border-blue-500"
              />

            </div>

            {/* KONFIRMASI */}
            <div className="mt-4">

              <label className="text-gray-700 font-medium">
                Konfirmasi Password
              </label>

              <input
                type="password"
                placeholder="Ulangi password"
                value={konfirmPassword}
                onChange={(e) =>
                  setKonfirmPassword(e.target.value)
                }
                className="w-full mt-2 p-3 border rounded-xl outline-none focus:border-blue-500"
              />

            </div>

            {/* BUTTON REGISTER */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 duration-300 disabled:opacity-50"
            >

              {loading
                ? "Loading..."
                : "Daftar Sekarang"}

            </button>

          </>

        )}

      </div>

    </div>
  );
}