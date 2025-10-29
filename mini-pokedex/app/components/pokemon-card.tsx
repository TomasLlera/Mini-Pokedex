// components/pokemon-card.tsx
import Link from 'next/link';
import { getIdFromUrl } from '../lib/pokeapi';

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const id = getIdFromUrl(url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link
      href={`/pokedex/${name}`}
      className="block border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-400 hover:scale-105 transition-all duration-200 bg-white"
    >
      <div className="aspect-square relative mb-2 bg-gray-50 rounded-lg flex items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain p-2"
          loading="lazy"
        />
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 font-medium">#{id.toString().padStart(3, '0')}</p>
        <p className="text-sm font-semibold capitalize text-gray-800">{name}</p>
      </div>
    </Link>
  );
}