// app/pokedex/[name]/page.tsx
import Link from 'next/link';
import { getPokemon } from '../../lib/pokeapi';
import StatsChart from '../../components/stats-chart';

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;
  
  console.log('Loading Pokemon:', name); // Debug log
  
  const pokemon = await getPokemon(name);
  const artworkUrl = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Link 
          href="/pokedex" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Volver al Pokédex
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header con imagen y datos básicos */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                {artworkUrl && (
                  <img
                    src={artworkUrl}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="w-48 h-48 object-contain"
                  />
                )}
              </div>

              <div className="text-white text-center md:text-left flex-1">
                <p className="text-sm font-bold opacity-90">
                  #{pokemon.id.toString().padStart(3, '0')}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold capitalize mb-4">
                  {pokemon.name}
                </h1>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  {pokemon.types.map(t => (
                    <span
                      key={t.type.name}
                      className="px-4 py-1 rounded-full text-sm font-semibold capitalize shadow-lg"
                      style={{ backgroundColor: TYPE_COLORS[t.type.name] || '#777' }}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6 justify-center md:justify-start text-sm">
                  <div>
                    <p className="opacity-80">Altura</p>
                    <p className="text-2xl font-bold">{pokemon.height / 10} m</p>
                  </div>
                  <div>
                    <p className="opacity-80">Peso</p>
                    <p className="text-2xl font-bold">{pokemon.weight / 10} kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="p-8">
            <StatsChart stats={pokemon.stats} />
          </div>
        </div>

        {/* Sprite alternativo */}
        {pokemon.sprites.front_default && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Sprite del Juego</h3>
            <img
              src={pokemon.sprites.front_default}
              alt={`${pokemon.name} sprite`}
              className="mx-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        )}
      </div>
    </main>
  );
}