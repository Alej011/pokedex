type SearchFormProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
};

export default function SearchForm({
  query,
  onQueryChange,
  onSearch,
}: SearchFormProps) {
  return (
    <form
      className="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
        <label htmlFor="pokemon-search">
            buscar Pokémon por nombre, numero o peso.
        </label>
        
        <input 
            id="pokemon-search"
            name="pokemon"
            type="search"
            placeholder="Ejemplo: ditto"
            autoComplete="off"
            value={query}
            onChange={(event) => {
                onQueryChange(event.currentTarget.value);
            }}
        />

        <button type="submit">
            Buscar
        </button>
    </form>
  );
}
