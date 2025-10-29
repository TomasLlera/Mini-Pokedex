// app/pokedex/page.tsx
import Link from 'next/link';
import { getPokemonPage } from '../lib/pokeapi';
import PokemonCard from '../components/pokemon-card';
import SearchClient from './search-client';

interface PokedexProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Pokedex({ searchParams }: PokedexProps) {
  // Await searchParams antes de usarlo
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? '1'));
  const offset = Math.max(0, (page - 1) * 20);
  
  const data = await getPokemonPage(20, offset);
  
  // Limitar a primera generación (151 pokémon)
  const maxPages = Math.ceil(151 / 20);
  const hasNext = page < maxPages;
  const hasPrev = page > 1;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔴 Pokédex
          </h1>
          <p className="text-gray-600">
            Explora la primera generación de Pokémon
          </p>
        </header>

        <SearchClient />

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Mostrando {offset + 1}-{Math.min(offset + 20, 151)} de 151 Pokémon
            </p>
            <p className="text-sm font-medium text-gray-700">
              Página {page} de {maxPages}
            </p>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data.results.map((p) => (
              <li key={p.name}>
                <PokemonCard name={p.name} url={p.url} />
              </li>
            ))}
          </ul>

          <nav className="flex justify-between items-center pt-6 mt-6 border-t">
            {hasPrev ? (
              <Link
                href={`/pokedex?page=${page - 1}`}
                className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600"
              >
                ← Anterior
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-400">
                ← Anterior
              </span>
            )}
            
            <span className="text-sm font-medium text-gray-700">
              Página {page}
            </span>
            
            {hasNext ? (
              <Link
                href={`/pokedex?page=${page + 1}`}
                className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600"
              >
                Siguiente →
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-400">
                Siguiente →
              </span>
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}