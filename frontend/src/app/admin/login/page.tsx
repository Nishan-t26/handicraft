export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 shadow rounded w-96">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
