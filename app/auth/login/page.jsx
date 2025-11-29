import { loginUser } from "@/lib/auth";
import { redirect } from "next/navigation";

// ⭐ Server Action wrapper
export async function handleLogin(formData) {
  "use server";

  console.log("🔥 handleLogin CALLED");

  const res = await loginUser(formData);
  console.log("📦 RESULT FROM loginUser:", res);

  if (res?.error) {
    console.log("❌ LOGIN ERROR:", res.error);
    return res.error; // Return error if needed
  }

  console.log("➡️ Redirecting to /dashboard");
  redirect("/dashboard"); // Login success
}

export default function LoginPage() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center font-sans"
      style={{
        backgroundImage: "url('/images/bg.png')",
      }}
    >
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="w-full max-w-lg">
          <form
            action={handleLogin} // ⭐ wrapper action
            className="max-w-md mx-auto p-10 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-xl"
          >
            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <img
                src="/images/logo.png"
                alt="Company Logo"
                className="h-40 rounded-full w-auto"
              />
            </div>

            <p className="text-center text-2xl font-bold mb-6">LOGIN</p>

            {/* Email */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="px-4 py-2 w-full text-white bg-black bg-opacity-80 hover:bg-opacity-100 rounded transition"
            >
              Login
            </button>

            {/* Footer Links */}
            <div className="flex justify-between items-center mt-4">
              <a href="#" className="text-sm font-light hover:text-red-300">
                Forgot Password?
              </a>

              <a
                href="/auth/register"
                className="text-sm font-light hover:text-red-300"
              >
                Create an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
