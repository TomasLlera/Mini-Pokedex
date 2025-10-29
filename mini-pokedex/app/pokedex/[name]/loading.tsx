// app/pokedex/[name]/loading.tsx
export default function LoadingPokemon() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 bg-white/20 rounded-full"></div>
              <div className="flex-1 space-y-4 w-full">
                <div className="h-8 bg-white/20 rounded w-32"></div>
                <div className="h-12 bg-white/20 rounded w-64"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-white/20 rounded w-24"></div>
                  <div className="h-8 bg-white/20 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="flex-1 h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </main>
  );
}