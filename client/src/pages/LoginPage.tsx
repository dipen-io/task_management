import { type JSX, useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    // Mock login - replace with real API
    setTimeout(() => {
      setLoading(false);
      if (email === "demo@example.com" && password === "password") {
        alert("Login successful!");
      } else {
        setError("Invalid credentials. Use demo@example.com / password");
      }
    }, 1000);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes drift {
          0% { transform: translateX(-10%); }
          50% { transform: translateX(10%); }
          100% { transform: translateX(-10%); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-drift { animation: drift 20s ease-in-out infinite; }
      `}</style>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
        {/* Looping background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-drift" />
        </div>

        <div className="relative z-10 w-full max-w-6xl px-4 flex flex-wrap items-center justify-center lg:justify-between">

          {/* Image */}
          <div className="mb-10 md:mb-0 md:w-9/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full animate-float"
              style={{ animationDuration: "8s" }}
              alt="Login"
            />
          </div>

          {/* Form */}
          <div className="md:w-8/12 lg:w-5/12">
            <form onSubmit={handleLogin} className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 space-y-6">

              {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <TEInput
                type="email"
                label="Email address"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TEInput
                type="password"
                label="Password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-neutral-300" />
                  Remember me
                </label>
                <a href="#!" className="text-primary hover:underline">Forgot password?</a>
              </div>

              <TERipple rippleColor="light">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded bg-primary py-3 text-sm font-medium uppercase text-white shadow transition hover:bg-primary-600 disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </TERipple>

              <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">
                Don't have an account?{" "}
                <a href="/signup" className="text-danger font-semibold hover:underline">Register</a>
              </p>

              <p className="text-center text-xs text-neutral-400">
                Demo: demo@example.com / password
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
