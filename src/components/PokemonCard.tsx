import type {Pokemon } from '../types/pokemon';

type PokemonCardProps = {
    pokemon: Pokemon;
}

export default function PokemonCard({pokemon}: PokemonCardProps) {
    return (
        <article className="pokemon-card">
            <div className="viewport">
                {pokemon.image ? (
                    <img 
                    src={pokemon.image} 
                    alt={`Imagen de${pokemon.name}`} 
                    />
                ) : (
                    <span>No image available</span>
                )}
            </div>

            <h2>{pokemon.name}</h2>

            <p className="weight">
                <span>Peso</span> {pokemon.weightKg} kg
            </p>

            <p className="weight">
               <span>Altura</span> {pokemon.heightCm} cm
            </p>
        </article>
    );
}