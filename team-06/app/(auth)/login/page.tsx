"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticateParent } from "@/lib/auth/auth-service";

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "signup_parent" | "signup_kid">("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (authMode !== "login") {
      return;
    }

    if (!identifier.trim() || !password) {
      setErrorMessage("Please enter both username/email and password.");
      return;
    }

    setIsLoading(true);
    const result = await authenticateParent(identifier, password);
    setIsLoading(false);

    if (result.success && result.redirectTo) {
      router.push(result.redirectTo);
    } else {
      setErrorMessage(result.error || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1E4D1] text-[#162660] flex flex-col font-sans selection:bg-[#D0E6FD] selection:text-[#162660]">
      {/* Top Header Bar - Bordered bottom like Aralkada */}
      <header className="w-full border-b-2 border-[#4A3B2C]/30 bg-[#F1E4D1]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-[#162660] flex items-center justify-center text-[#F1E4D1] font-black text-2xl border-2 border-[#4A3B2C] shadow-[0_3px_0_#4A3B2C] transform -rotate-2 group-hover:rotate-0 transition-transform">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-[#162660] leading-none">
                KITH.AI
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#162660]/70 uppercase mt-1">
                YOUR SMART RESILIENCE-BUILDING SOLUTION
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container - Auth Card aligned to the right side */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 flex items-center justify-end py-4">
        {/* Auth Form Card - Aralkada Claymorphism Style */}
        <div className="w-full max-w-sm aralkada-card p-5 sm:p-6 flex flex-col my-0">

          {/* Card Title */}
          <h2 className="text-xl sm:text-2xl font-black text-center text-[#162660] mb-3.5 tracking-tight">
            {authMode === "login" && "Log in"}
            {authMode === "signup_parent" && "Sign up as Parent"}
            {authMode === "signup_kid" && "Sign up Kid Account"}
          </h2>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-3 p-2.5 rounded-xl bg-red-100 border-2 border-red-400 text-red-800 text-xs font-bold text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-2.5">
            {/* Username / Email */}
            <div>
              <label htmlFor="auth-username" className="block text-[11px] font-black text-[#162660] uppercase tracking-wider mb-1">
                {authMode === "signup_kid" ? "Kid Username" : "Email or username"}
              </label>
              <input
                id="auth-username"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={authMode === "signup_kid" ? "Choose a fun username" : "Email or username"}
                className="w-full px-3.5 py-2.5 aralkada-input text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="auth-password" className="block text-[11px] font-black text-[#162660] uppercase tracking-wider">
                  Password
                </label>
                {authMode === "login" && (
                  <button
                    type="button"
                    className="text-[11px] font-black text-[#162660]/75 hover:text-[#162660] uppercase tracking-wider underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#162660]/40 rounded"
                  >
                    FORGOT?
                  </button>
                )}
              </div>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3.5 py-2.5 aralkada-input text-sm"
              />
            </div>

            {/* Parent Link Code for Kid Sign up */}
            {authMode === "signup_kid" && (
              <div>
                <label htmlFor="parent-code" className="block text-[11px] font-black text-[#162660] uppercase tracking-wider mb-1">
                  Parent Link Code
                </label>
                <input
                  id="parent-code"
                  type="text"
                  placeholder="Enter 6-digit code from parent"
                  className="w-full px-3.5 py-2.5 aralkada-input text-sm"
                />
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-1 py-2.5 aralkada-btn-primary text-sm cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#162660]/30 disabled:opacity-60"
            >
              {isLoading
                ? "LOGGING IN..."
                : authMode === "login"
                  ? "LOG IN"
                  : authMode === "signup_parent"
                    ? "CREATE PARENT ACCOUNT"
                    : "CREATE KID ACCOUNT"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative my-3.5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-[#4A3B2C]/20"></div>
            </div>
            <span className="relative px-3 bg-white text-[10px] font-black uppercase tracking-widest text-[#162660]/60">
              OR
            </span>
          </div>

          {/* Dual Sign Up Section */}
          {authMode === "login" ? (
            <div className="flex flex-col gap-2">
              <span className="text-center text-[11px] font-black text-[#162660]/80 uppercase tracking-wider mb-0.5">
                Don't have an account? Sign up:
              </span>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setAuthMode("signup_parent");
                }}
                className="w-full py-2.5 px-4 aralkada-btn-secondary text-xs cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#D0E6FD]"
              >
                <span>SIGN UP AS PARENT</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setAuthMode("signup_kid");
                }}
                className="w-full py-2.5 px-4 aralkada-btn-outline text-xs cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F1E4D1]"
              >
                <span>SIGN UP KID ACCOUNT</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setAuthMode("login");
                }}
                className="text-xs font-black text-[#162660] uppercase tracking-wider hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#162660]/40 rounded p-1"
              >
                Already have an account? Log in
              </button>
            </div>
          )}

          {/* Footer Terms */}
          <p className="mt-4 text-center text-[10px] font-extrabold text-[#162660]/70 leading-normal">
            By signing up or logging in, you agree to our{" "}
            <a href="#" className="underline font-black text-[#162660] focus:outline-none focus:ring-1 focus:ring-[#162660]">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline font-black text-[#162660] focus:outline-none focus:ring-1 focus:ring-[#162660]">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}



