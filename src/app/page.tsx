"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleGitHubClick = () => {
    // Opens the backend login in a new tab so they don't lose this page!
    window.open("https://hng-stage-0-api-eta.vercel.app/auth/github", "_blank");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanToken = token.trim();

    if (!cleanToken) {
      setError("Please paste your token first.");
      return;
    }

    // Save the token to the browser's Local Storage
    localStorage.setItem("insighta_token", cleanToken);

    // Send the user to the Dashboard!
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100">
        <div className="w-16 h-16 bg-blue-600 rounded-xl mx-auto flex items-center justify-center mb-6 shadow-md">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold mb-3 text-gray-900">
          Insighta Portal
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Secure data analytics dashboard for Insighta Labs internal teams.
        </p>

        {/* Step 1: Get the Token */}
        <button
          onClick={handleGitHubClick}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-sm mb-6"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            ></path>
          </svg>
          1. Get Token via GitHub
        </button>

        <div className="relative flex items-center py-2 mb-6">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink-0 mx-4 text-gray-400 text-sm">Then</span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        {/* Step 2: Paste the Token */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="2. Paste access_token here..."
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 transition-all"
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
