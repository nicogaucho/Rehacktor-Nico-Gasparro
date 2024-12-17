import { useState, useEffect } from "react";
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";
import GameUI from "../components/GameUI";
import SideBarFilters from "../components/SidebarFiltersUI";
import ModalSearchUI from "../components/ModalSearchUI";

export default function AppHome() {
  
  const [focus, setFocus] = useState(false);
  // const [games, setGames] = useState([]);
  // useEffect(() => {
  //   async function fetchGames() {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL}games?key=${
  //         import.meta.env.VITE_API_KEY
  //       }&dates=2023-01-01,2024-01-01&page=1`
  //     );
  //     const json = await response.json();
  //     setGames(json.results);
  //   }
  //   fetchGames();
  // }, []);

  let games = useAsyncList({
    async load({ signal, cursor }) {
      let res = await fetch(
        cursor ||
          `${import.meta.env.VITE_API_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&dates=2023-01-01,2024-01-01&page=1`,
        {
          signal,
        }
      );
      let json = await res.json();
      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    // Ogni volta che si aggiorna in view fammi vedere il suo stato
    // Quando sei in inView caricara loadMore()
    // Serie di controlli per prevenire loadMore() al primo render...
    // ce un modo per intercettare quando i miei dati non sono ancora caricati...
    if (games.items.length && inView && !games.isLoading) {
      games.loadMore();
    }
  }, [inView, games]);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleClickOverlay = () => {
    setFocus(false);
  };

  return (
    <main className="container">
      <ModalSearchUI focus={focus} handleClickOverlay={handleClickOverlay} />
      <SideBarFilters />
      <div className="game_container">
        <h1>Trend e novitá sui principali videogiochi</h1>
        <label htmlFor="search">
          Cerca tra i principali giochi e confrontalo con altri gamers
        </label>
        <input
          type="search"
          name="search"
          aria-label="Search"
          onFocus={handleFocus}
        />
        <div className="game_wrapper">
          {games.items.map((game) => (
            <GameUI key={game.id} game={game} />
          ))}
        </div>
        <div ref={ref} aria-busy="true" className="loading"></div>
      </div>
    </main>
  );
}
