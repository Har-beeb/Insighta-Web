import { Profile } from "../types";

interface DataTableProps {
  profiles: Profile[];
  loading: boolean;
  error: string;
  currentPage: number;
  hasMore: boolean;
  onPageChange: (newPage: number) => void;
}

export default function DataTable({
  profiles,
  loading,
  error,
  currentPage,
  hasMore,
  onPageChange,
}: DataTableProps) {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 grow flex flex-col overflow-hidden">
      {loading ? (
        <div className="flex justify-center items-center grow py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-500 font-medium">
            Loading records...
          </span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Gender</th>
                  <th className="px-6 py-4 font-semibold">Age</th>
                  <th className="px-6 py-4 font-semibold">Country ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {profiles.map((profile, index) => {
                  const profileId = profile._id || profile.id;
                  return (
                    <tr
                      key={profileId || index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-gray-400">
                        {profileId
                          ? String(profileId).substring(0, 8) +
                            (String(profileId).length > 8 ? "..." : "")
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {profile.name}
                      </td>
                      <td className="px-6 py-4 capitalize">{profile.gender}</td>
                      <td className="px-6 py-4">{profile.age}</td>
                      <td className="px-6 py-4">{profile.country_id}</td>
                    </tr>
                  );
                })}
                {profiles.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No profiles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between mt-auto">
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Showing Page{" "}
              <span className="font-semibold text-gray-900">{currentPage}</span>
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasMore}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !hasMore
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
