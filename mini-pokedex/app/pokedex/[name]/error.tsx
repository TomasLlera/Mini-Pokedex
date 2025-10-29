'use client';

import Link from 'next/link';

export default function PokemonError({ 
  error,
  reset 
}: { 
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isPokemonNotFound = error.message.includes('not found');

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto p-6 flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full">
          <div className="text-6xl mb-4">
            {isPokemonNotFound ? '🔍' : '⚠️'}
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            {isPokemonNotFound ? 'Pokémon no encontrado' : 'Error al cargar el Pokémon'}
          </h1>
          <p className="text-gray-600 mb-2">
            {error.message || 'Ha ocurrido un error inesperado'}
          </p>
          {isPokemonNotFound && (
            <p className="text-sm text-gray-500 mb-6">
              Verifica que el nombre esté escrito correctamente en inglés (ej: pikachu, bulbasaur)
            </p>
          )}
          <div className="flex gap-4 justify-center flex-wrap">
            {!isPokemonNotFound && (
              <button
                onClick={reset}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                🔄 Reintentar
              </button>
            )}
            <Link
              href="/pokedex"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              ← Volver al Pokédex
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}