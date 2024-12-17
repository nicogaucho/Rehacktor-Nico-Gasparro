import { useEffect, useState } from "react";
import AutoCompleteCardUI from "../AutoCompleteCardUI/index";

export default function ModalSearchUI({ focus, handleClickOverlay }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const timeoutAPI = setTimeout(() => {
      async function fetchSearchedGames() {
        if (!search) return;
        setGames([]);
        setLoading(true)
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&page=1&search=${search}`
        );
        const json = await response.json();
        setGames(json.results);
        setLoading(false);
      }
      fetchSearchedGames();
    }, 500);

    // come pulisco tutti i valori di risposta dopo l'uso di una web API ottenendo l'ultimo valore
    // disposal function per pulire web APIs 
    return () => {
      clearTimeout(timeoutAPI);
    }
  }, [search]);

  return (
    <dialog open={focus}>
      <article>
        <header>
          <button
            aria-label="Close"
            rel="prev"
            onClick={handleClickOverlay}
          ></button>
          <h3>Cerca per nome il tuo gioco</h3>
        </header>
        <form>
          <input
            type="search"
            name="search"
            value={search}
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
        <div className="autoSuggestedWrapper">
          {loading && <article aria-busy="true"></article>}
          {games && games.map((game) => (
            <AutoCompleteCardUI key={game.id} game={game} />
          ))}
        </div>
        <footer>
          <button>Ricerca gioco</button>
        </footer>
      </article>
    </dialog>
  );
}
