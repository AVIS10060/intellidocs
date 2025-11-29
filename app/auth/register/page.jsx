
import { registerUser } from "@/lib/auth";
import { redirect } from "next/navigation";

// export async function handleRegister(formData) {
//   "use server";
//   console.log("🔥 registerUser CALLED");  

//   const res = await registerUser(formData);

//   if (res?.error) {
//     return res.error;
//   }

//   redirect("/dashboard");
// }
export async function handleRegister(formData) {
  "use server";
  console.log("🔥 handleRegister CALLED"); // <--- LOG A

  const res = await registerUser(formData);
  console.log("📦 RESULT FROM registerUser:", res); // <--- LOG B

  if (res?.error) {
    console.log("❌ ERROR:", res.error); // <--- LOG C
    return res.error;
  }

  console.log("➡️ Redirecting to /dashboard"); // <--- LOG D
  redirect("/dashboard");
}


export default function RegisterPage() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="w-full max-w-lg">
          <form
            action={handleRegister}  // ❌ no method  
            className="max-w-md mx-auto p-10 bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-xl"
          >
            <div className="mb-6 flex justify-center">
              <img
                src="/images/logo.png"
                alt="Company Logo"
                className="h-40 rounded-full w-auto"
              />
            </div>

            <p className="text-center text-2xl font-bold mb-6">
              CREATE ACCOUNT
            </p>

            <div className="mb-3">
              <label className="block text-sm mb-1">Name</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
              />
            </div>

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

            <button
              type="submit"
              className="px-4 py-2 w-full text-white bg-black bg-opacity-80 hover:bg-opacity-100 rounded transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
