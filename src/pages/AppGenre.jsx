import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GameUI from "../components/GameUI";

export default function AppGenre() {
  const { genre_slug } = useParams();
  const [genreGames, setGenreGames] = useState([]);

  useEffect(() => {
    async function fetchGenreGames() {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}games?key=${
          import.meta.env.VITE_API_KEY
        }&genres=${genre_slug}`
      );
      const json = await response.json();
      setGenreGames(json.results);
    }
    fetchGenreGames();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>Genere {genre_slug}</h1>
      <small>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
        deserunt fuga nesciunt reprehenderit amet aperiam ipsam odit totam odio,
        beatae, ullam omnis architecto natus iusto quasi quia optio. Itaque,
        enim.
      </small>
      <div className="game_wrapper">
        {genreGames.map((game) => (
          <GameUI key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
