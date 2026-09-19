import {useEffect, useRef, useState} from 'react';
import PokemonList from './components/PokemonList';
import SearchForm from './components/SearchForm';
import { searchPokemon } from './services/pokemonService';
import RequestStatus from './components/RequestStatus';
import type { RequestState } from './types/request';
import type { Pokemon } from './types/pokemon';

export default function App() {

  const [requestState, setRequestState] = useState<RequestState>({status: 'idle'});
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState('');
  const debounceTimer = useRef<number | null>(null);
  const requestController = useRef<AbortController | null>(null);

  async function runSearch(searchText: string) {

    cancelCurrentRequest();

    const normalizedQuery = searchText.trim().toLowerCase();

    if(normalizedQuery === ''){
      setRequestState({status: 'idle'});
      return;
    }

    const controller = new AbortController();
    requestController.current = controller;

    setRequestState({status: 'loading', query: normalizedQuery});
    
    try {
      const pokemon =  await searchPokemon(normalizedQuery, controller.signal);

      if(controller.signal.aborted){
        return;
      }
      
      if (pokemon === null){
        setRequestState({status: 'empty', query: normalizedQuery});
        return;
      }

      setPokemons((currentPokemons) => {

        const alreadyExists = currentPokemons.some(
          (currentPokemon) => currentPokemon.id === pokemon.id
        );
        
        if (alreadyExists) {
          return currentPokemons;
        }

        return [...currentPokemons, pokemon];
      });

      setRequestState({status: 'success', pokemonName: pokemon.name});

    } catch(error){
      
      if(controller.signal.aborted){
        return;
      }
      console.error('Error al consultar PokeApi:', error);

      setRequestState({
        status: 'error', 
        message: 'No pudimos completar la solicitud, comprueba tu conexion a internet e Intenta de nuevo.'
      });
    } finally {
      if(requestController.current === controller){
        requestController.current = null;
      }
    } 
  }

  function clearSearchTimer (){
    if(debounceTimer.current !== null){
      window.clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
  }

  function handlerQueryChange(value: string){
    setQuery(value);
    clearSearchTimer();
    cancelCurrentRequest();

    setRequestState({status: 'idle'});

    if (value.trim() === ''){
      return;
    }

    debounceTimer.current = window.setTimeout(() => {
      debounceTimer.current = null;
      void runSearch(value);;
    }, 500);
  }

  function handleSearch(){
    clearSearchTimer();
    void runSearch(query);
  }

  function cancelCurrentRequest(){
    requestController.current?.abort();
    requestController.current = null;
  }

  useEffect(() => {
    return () => {
      if (debounceTimer.current !== null){
        window.clearTimeout(debounceTimer.current);
      }
      requestController.current?.abort();
    };
  }, []);

  return(
    <main className="stage">
      <header className="head">
        <h1>Pokédex</h1>
        <p className="lede">
          Esta es una Pokédex de ejemplo, que muestra información de un Pokémon ficticio.
        </p>
      </header>

      <SearchForm
        query={query}
        onQueryChange={handlerQueryChange}
        onSearch={handleSearch}
      />
      <RequestStatus request={requestState} />

      <PokemonList pokemons={pokemons} />
    </main>
  )
}