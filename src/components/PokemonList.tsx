import type { Pokemon } from '../types/pokemon';
import PokemonCard from './PokemonCard';

type PokemonListProps = {
    pokemons: Pokemon[];
}

export default function PokemonList ({pokemons}: PokemonListProps) {
    return (
        <section className="dex" aria-label="Lista de pokemon">
            {pokemons.map((pokemon) => (
                <PokemonCard 
                key={pokemon.id} 
                pokemon={pokemon} 
                />
            ))}
        </section>
    );
}