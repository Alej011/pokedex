import type { Pokemon } from '../types/pokemon';

type PokemonApiResponse = {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: {
        front_default: string | null;
        other: {
            'official-artwork': {
                front_default: string | null;
            };
        };
    };
};

export async function searchPokemon(query: string, signal: AbortSignal
): Promise<Pokemon | null>{
    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`;

    const response = await fetch(url, {signal});
    
    if(response.status === 404){
        return null;
    }

    if(!response.ok){
        throw new Error (`Error en la solicitud a PokeAPI. Intenta de nuevo: ${response.status}`);
    }
    
    const data: PokemonApiResponse = await response.json();

    return {
        id: data.id,
        name: data.name,
        weightKg: data.weight / 10,
        heightCm: data.height * 10,
        image: data.sprites.other['official-artwork'].front_default ?? 
        data.sprites.front_default,
    }
}