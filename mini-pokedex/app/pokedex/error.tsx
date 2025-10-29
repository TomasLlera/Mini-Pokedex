'use client';

import Link from 'next/link';

export default function Error({ 
  error,
  reset 
}: { 
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto p-6 flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Error al cargar el Pokédex
          </h1>
          <p className="text-gray-600 mb-2">
            {error.message || 'Ha ocurrido un error inesperado'}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Por favor, verifica tu conexión a internet e intenta nuevamente.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={reset}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              🔄 Reintentar
            </button>
            <Link
              href="/pokedex"
              className="inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              🏠 Volver al inicio
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && error.digest && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">
                Detalles técnicos
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </main>
  );
}