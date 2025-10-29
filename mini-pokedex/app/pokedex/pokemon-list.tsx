'use client';

import { useState, useMemo } from 'react';
import PokemonCard from '../components/pokemon-card';
import type { PokemonListItem } from '../lib/pokeapi';

interface PokemonListProps {
  allPokemon: PokemonListItem[];
  initialPage: number;
}

const ITEMS_PER_PAGE = 20;

export default function PokemonList({ allPokemon, initialPage }: PokemonListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Filtrar pokémon por nombre (búsqueda en tiempo real)
  const filteredPokemon = useMemo(() => {
    if (!searchQuery.trim()) {
      return allPokemon;
    }
    const query = searchQuery.toLowerCase().trim();
    return allPokemon.filter(p => 
      p.name.toLowerCase().includes(query)
    );
  }, [allPokemon, searchQuery]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  // Reset a página 1 cuando cambia el filtro
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  return (
    <>
      {/* Barra de búsqueda para FILTRAR la lista */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🔍 Filtrar lista por nombre
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Escribe para filtrar (ej: char, pika, bulb)..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
              title="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="mt-2 text-sm text-blue-600 font-medium">
            {filteredPokemon.length} Pokémon encontrado{filteredPokemon.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Lista de Pokémon */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {currentPokemon.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredPokemon.length)} de {filteredPokemon.length}
              </p>
              {totalPages > 1 && (
                <p className="text-sm font-medium text-gray-700">
                  Página {currentPage} de {totalPages}
                </p>
              )}
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {currentPokemon.map((p) => (
                <li key={p.name}>
                  <PokemonCard name={p.name} url={p.url} />
                </li>
              ))}
            </ul>

            {/* Paginación */}
            {totalPages > 1 && (
              <nav className="flex justify-between items-center pt-6 mt-6 border-t">
                {hasPrev ? (
                  <button
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600"
                  >
                    ← Anterior
                  </button>
                ) : (
                  <span className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-400">
                    ← Anterior
                  </span>
                )}
                
                <span className="text-sm font-medium text-gray-700">
                  Página {currentPage} de {totalPages}
                </span>
                
                {hasNext ? (
                  <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Siguiente →
                  </button>
                ) : (
                  <span className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-400">
                    Siguiente →
                  </span>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No se encontraron Pokémon
            </h3>
            <p className="text-gray-600 mb-4">
              No hay resultados para "{searchQuery}"
            </p>
            <button
              onClick={() => handleSearch('')}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Limpiar búsqueda y ver todos
            </button>
          </div>
        )}
      </div>
    </>
  );
}