// lib/pokeapi.ts

export type PokemonListItem = { 
  name: string; 
  url: string 
};

export type PokemonListResponse = { 
  count: number; 
  results: PokemonListItem[] 
};

export type PokemonDetail = {
  name: string;
  id: number;
  sprites: { 
    front_default: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
      }
    }
  };
  types: { slot: number; type: { name: string } }[];
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
};

const API = 'https://pokeapi.co/api/v2';

export async function getPokemonPage(
  limit = 20, 
  offset = 0
): Promise<PokemonListResponse> {
  try {
    const res = await fetch(
      `${API}/pokemon?limit=${limit}&offset=${offset}`,
      { 
        next: { revalidate: 3600 },
        cache: 'force-cache'
      }
    );
    
    if (!res.ok) {
      throw new Error(`Error fetching Pokemon list: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error in getPokemonPage:', error);
    throw error;
  }
}

export async function getPokemon(name: string): Promise<PokemonDetail> {
  try {
    const res = await fetch(
      `${API}/pokemon/${name.toLowerCase()}`,
      { 
        next: { revalidate: 3600 },
        cache: 'force-cache'
      }
    );
    
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`Pokemon "${name}" not found`);
      }
      throw new Error(`Error fetching Pokemon: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error in getPokemon:', error);
    throw error;
  }
}

// Función auxiliar para extraer el ID de una URL
export function getIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1]);
}