'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    
    if (q) {
      router.push(`/pokedex/${q.toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ir directamente a un Pokémon (ej: pikachu)..."
          className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Tip: Usa el campo de abajo para buscar en la lista, o este para ir directo al detalle
      </p>
    </form>
  );
}