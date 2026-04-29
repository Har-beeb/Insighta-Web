"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "../../types";
import { fetchProfilesData } from "../../lib/api";
import DataTable from "../../components/DataTable";

export default function DashboardPage() {
  const router = useRouter();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("insighta_token");

    if (!token) {
      router.push("/");
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchProfilesData(token, currentPage);
        setProfiles(data);
        setHasMore(data.length === 10);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          "Failed to load profiles. Your token might be expired or invalid.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router, currentPage]);

  const handleLogout = () => {
    localStorage.removeItem("insighta_token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Insighta Portal</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8 w-full grow flex flex-col">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Profiles</h2>
            <p className="text-gray-500 text-sm mt-1">
              Viewing all secure records from the database.
            </p>
          </div>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
            Page {currentPage}
          </div>
        </div>

        {/* The Clean Component Call */}
        <DataTable
          profiles={profiles}
          loading={loading}
          error={error}
          currentPage={currentPage}
          hasMore={hasMore}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
